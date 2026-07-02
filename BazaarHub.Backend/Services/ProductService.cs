using Microsoft.EntityFrameworkCore;
using BazaarHub.Backend.Data;
using BazaarHub.Backend.Models.ViewModels;
using System.Text.Json;

namespace BazaarHub.Backend.Services;

public class ProductService : IProductService
{
    private readonly ApplicationDbContext _db;

    public ProductService(ApplicationDbContext db) => _db = db;

    public async Task<ProductViewModel> GetProductsAsync(string? category, string? search, decimal? minPrice, decimal? maxPrice, int? rating, string? sortBy, int page, int pageSize)
    {
        var query = _db.Products.Include(p => p.Category).AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var q = search.ToLower();
            query = query.Where(p => p.Name.ToLower().Contains(q) || p.Brand.ToLower().Contains(q));
        }

        if (!string.IsNullOrWhiteSpace(category))
        {
            var cat = await _db.Categories.FirstOrDefaultAsync(c => c.Slug == category);
            if (cat != null)
            {
                var childSlugs = await _db.Categories.Where(c => c.ParentId == cat.Id).Select(c => c.Slug).ToListAsync();
                var allSlugs = new List<string> { cat.Slug };
                allSlugs.AddRange(childSlugs);
                query = query.Where(p => p.Category != null && allSlugs.Contains(p.Category.Slug));
            }
        }

        if (minPrice.HasValue) query = query.Where(p => p.Price >= minPrice.Value);
        if (maxPrice.HasValue) query = query.Where(p => p.Price <= maxPrice.Value);
        if (rating.HasValue) query = query.Where(p => p.Rating >= rating.Value);

        query = sortBy switch
        {
            "price-asc" => query.OrderBy(p => p.Price),
            "price-desc" => query.OrderByDescending(p => p.Price),
            "rating" => query.OrderByDescending(p => p.Rating),
            "discount" => query.OrderByDescending(p => p.Discount),
            _ => query.OrderByDescending(p => p.CreatedAt)
        };

        var totalCount = await query.CountAsync();
        var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        var categories = await _db.Categories.Select(c => new CategoryDto
        {
            Id = c.Id, Name = c.Name, Slug = c.Slug, Icon = c.Icon, Image = c.Image, ParentId = c.ParentId
        }).ToListAsync();

        return new ProductViewModel
        {
            Products = items.Select(MapToDto).ToList(),
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            Categories = categories,
            MinPrice = await _db.Products.MinAsync(p => p.Price),
            MaxPrice = await _db.Products.MaxAsync(p => p.Price),
        };
    }

    public async Task<ProductDetailViewModel?> GetProductDetailAsync(string slug)
    {
        var product = await _db.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Slug == slug);
        if (product == null) return null;

        var reviews = await _db.Reviews.Where(r => r.ProductId == product.Id)
            .OrderByDescending(r => r.CreatedAt).Take(10).ToListAsync();

        var related = await GetRelatedProductsAsync(product.Id, product.CategoryId, 4);

        return new ProductDetailViewModel
        {
            Product = MapToDto(product),
            Reviews = reviews.Select(r => new ReviewDto
            {
                Id = r.Id, ProductId = r.ProductId, UserId = r.UserId,
                UserName = r.UserName, UserAvatar = r.UserAvatar,
                Rating = r.Rating, Comment = r.Comment, CreatedAt = r.CreatedAt
            }).ToList(),
            RelatedProducts = related,
            AverageRating = product.Rating
        };
    }

    public async Task<List<ProductDto>> GetFeaturedProductsAsync(int count = 8)
    {
        var products = await _db.Products.Where(p => p.Featured).Take(count).ToListAsync();
        return products.Select(MapToDto).ToList();
    }

    public async Task<List<ProductDto>> GetRelatedProductsAsync(int productId, int categoryId, int count = 4)
    {
        var products = await _db.Products.Where(p => p.CategoryId == categoryId && p.Id != productId).Take(count).ToListAsync();
        return products.Select(MapToDto).ToList();
    }

    private static ProductDto MapToDto(Models.Product p)
    {
        return new ProductDto
        {
            Id = p.Id, Name = p.Name, Slug = p.Slug, Description = p.Description,
            Price = p.Price, OriginalPrice = p.OriginalPrice, Discount = p.Discount,
            Images = DeserializeList(p.Images),
            CategoryId = p.CategoryId, Category = p.Category?.Name ?? "",
            Brand = p.Brand, Rating = p.Rating, ReviewCount = p.ReviewCount, Stock = p.Stock,
            Sizes = DeserializeList(p.Sizes), Colors = DeserializeList(p.Colors),
            DeliveryDays = p.DeliveryDays, FreeShipping = p.FreeShipping, Featured = p.Featured,
            CreatedAt = p.CreatedAt,
            Specifications = DeserializeDict(p.Specifications)
        };
    }

    private static List<string> DeserializeList(string json) =>
        string.IsNullOrWhiteSpace(json) ? new() : JsonSerializer.Deserialize<List<string>>(json) ?? new();

    private static Dictionary<string, string> DeserializeDict(string json) =>
        string.IsNullOrWhiteSpace(json) ? new() : JsonSerializer.Deserialize<Dictionary<string, string>>(json) ?? new();
}
