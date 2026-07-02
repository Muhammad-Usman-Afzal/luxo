using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BazaarHub.Backend.Data;
using BazaarHub.Backend.Models;
using BazaarHub.Backend.Models.ViewModels;
using BazaarHub.Backend.Services;
using System.Text.Json;
using System.IO;

namespace BazaarHub.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly IOrderService _orderService;

    public AdminController(ApplicationDbContext db, IOrderService orderService)
    {
        _db = db;
        _orderService = orderService;
    }

    /// <summary>
    /// GET /api/admin/dashboard
    /// Returns AdminDashboardViewModel with sales, orders, users, charts
    /// </summary>
    [HttpGet("dashboard")]
    public async Task<ActionResult<AdminDashboardViewModel>> GetDashboard()
    {
        var totalSales = await _db.Orders.Where(o => o.Status != "cancelled").SumAsync(o => o.Total);
        var totalOrders = await _db.Orders.CountAsync();
        var totalUsers = await _db.Users.CountAsync(u => u.Role == "user");
        var totalProducts = await _db.Products.CountAsync();

        var recentOrders = await _orderService.GetAllOrdersAsync();
        var topProductsList = await _db.Products.OrderByDescending(p => p.Rating).Take(5).ToListAsync();
        var topProducts = topProductsList.Select(p => new ProductDto { Id = p.Id, Name = p.Name, Slug = p.Slug, Price = p.Price, Brand = p.Brand, Rating = p.Rating, ReviewCount = p.ReviewCount, Images = JsonSerializer.Deserialize<List<string>>(p.Images) ?? new() }).ToList();

        var orders = await _db.Orders.ToListAsync();

        return Ok(new AdminDashboardViewModel
        {
            TotalSales = totalSales,
            TotalOrders = totalOrders,
            TotalUsers = totalUsers,
            TotalProducts = totalProducts,
            RecentOrders = recentOrders.Take(5).ToList(),
            TopProducts = topProducts,
            SalesChart = new List<SalesChartDto>
            {
                new() { Month = "Jan", Sales = 120000 }, new() { Month = "Feb", Sales = 150000 },
                new() { Month = "Mar", Sales = 180000 }, new() { Month = "Apr", Sales = 140000 },
                new() { Month = "May", Sales = 200000 }, new() { Month = "Jun", Sales = 220000 },
            },
            OrderStatusDistribution = new List<OrderStatusDto>
            {
                new() { Status = "pending", Count = orders.Count(o => o.Status == "pending") },
                new() { Status = "confirmed", Count = orders.Count(o => o.Status == "confirmed") },
                new() { Status = "shipped", Count = orders.Count(o => o.Status == "shipped") },
                new() { Status = "delivered", Count = orders.Count(o => o.Status == "delivered") },
                new() { Status = "cancelled", Count = orders.Count(o => o.Status == "cancelled") },
            }
        });
    }

    /// <summary>
    /// GET /api/admin/orders
    /// Returns all orders for admin management
    /// </summary>
    [HttpGet("orders")]
    public async Task<ActionResult<List<OrderDto>>> GetAllOrders()
    {
        var orders = await _orderService.GetAllOrdersAsync();
        return Ok(orders);
    }

    /// <summary>
    /// GET /api/admin/users
    /// Returns all registered users
    /// </summary>
    [HttpGet("users")]
    public async Task<ActionResult<List<UserDto>>> GetAllUsers()
    {
        var users = await _db.Users.Select(u => new UserDto
        {
            Id = u.Id, FullName = u.FullName, Email = u.Email, Role = u.Role,
            Phone = u.Phone, Avatar = u.Avatar, Address = u.Address, City = u.City, CreatedAt = u.CreatedAt
        }).ToListAsync();
        return Ok(users);
    }

    /// <summary>
    /// GET /api/admin/products
    /// Returns all products (admin view)
    /// </summary>
    [HttpGet("products")]
    public async Task<ActionResult<List<ProductDto>>> GetAllProducts()
    {
        var productsList = await _db.Products.Include(p => p.Category).ToListAsync();
        var products = productsList.Select(p => new ProductDto
        {
            Id = p.Id, Name = p.Name, Slug = p.Slug, Description = p.Description,
            Price = p.Price, OriginalPrice = p.OriginalPrice, Discount = p.Discount,
            Brand = p.Brand, Rating = p.Rating, ReviewCount = p.ReviewCount, Stock = p.Stock,
            CategoryId = p.CategoryId, Category = p.Category!.Name,
            DeliveryDays = p.DeliveryDays, FreeShipping = p.FreeShipping, Featured = p.Featured,
            CreatedAt = p.CreatedAt,
            Images = JsonSerializer.Deserialize<List<string>>(p.Images) ?? new(),
            Sizes = JsonSerializer.Deserialize<List<string>>(p.Sizes) ?? new(),
            Colors = JsonSerializer.Deserialize<List<string>>(p.Colors) ?? new(),
        }).ToList();
        return Ok(products);
    }

    /// <summary>
    /// POST /api/admin/upload
    /// Uploads an image file and returns the accessible URL
    /// </summary>
    [HttpPost("upload")]
    [RequestSizeLimit(10 * 1024 * 1024)] // 10MB
    public async Task<ActionResult<object>> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new { message = "No file provided." });

        var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        Directory.CreateDirectory(uploadsDir);

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        var allowed = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg" };
        if (!allowed.Contains(ext))
            return BadRequest(new { message = "Invalid file type. Allowed: jpg, jpeg, png, gif, webp, bmp, svg" });

        var fileName = $"{Guid.NewGuid()}{ext}";
        var filePath = Path.Combine(uploadsDir, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var url = $"/uploads/{fileName}";
        return Ok(new { url, message = "Upload successful." });
    }

    /// <summary>
    /// POST /api/admin/products
    /// Creates a new product
    /// </summary>
    [HttpPost("products")]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] ProductDto dto)
    {
        var category = await _db.Categories.FindAsync(dto.CategoryId);
        if (category == null)
            return BadRequest(new { message = "Invalid category." });

        var product = new Product
        {
            Name = dto.Name,
            Slug = dto.Slug,
            Description = dto.Description ?? "",
            Price = dto.Price,
            OriginalPrice = dto.OriginalPrice,
            Discount = dto.Discount,
            Images = JsonSerializer.Serialize(dto.Images ?? new List<string>()),
            CategoryId = dto.CategoryId,
            Brand = dto.Brand ?? "",
            Rating = 0,
            ReviewCount = 0,
            Stock = dto.Stock,
            Sizes = JsonSerializer.Serialize(dto.Sizes ?? new List<string>()),
            Colors = JsonSerializer.Serialize(dto.Colors ?? new List<string>()),
            DeliveryDays = dto.DeliveryDays,
            FreeShipping = dto.FreeShipping,
            Featured = dto.Featured,
            CreatedAt = DateTime.UtcNow,
            Specifications = JsonSerializer.Serialize(dto.Specifications ?? new Dictionary<string, string>())
        };

        _db.Products.Add(product);
        await _db.SaveChangesAsync();

        dto.Id = product.Id;
        dto.Category = category.Name;
        return CreatedAtAction(nameof(GetAllProducts), new { }, dto);
    }

    /// <summary>
    /// PUT /api/admin/products/{id}
    /// Updates an existing product
    /// </summary>
    [HttpPut("products/{id}")]
    public async Task<ActionResult<ProductDto>> UpdateProduct(int id, [FromBody] ProductDto dto)
    {
        var product = await _db.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
        if (product == null)
            return NotFound(new { message = "Product not found." });

        product.Name = dto.Name;
        product.Slug = dto.Slug;
        product.Description = dto.Description ?? "";
        product.Price = dto.Price;
        product.OriginalPrice = dto.OriginalPrice;
        product.Discount = dto.Discount;
        product.Images = JsonSerializer.Serialize(dto.Images ?? new List<string>());
        product.CategoryId = dto.CategoryId;
        product.Brand = dto.Brand ?? "";
        product.Stock = dto.Stock;
        product.Sizes = JsonSerializer.Serialize(dto.Sizes ?? new List<string>());
        product.Colors = JsonSerializer.Serialize(dto.Colors ?? new List<string>());
        product.DeliveryDays = dto.DeliveryDays;
        product.FreeShipping = dto.FreeShipping;
        product.Featured = dto.Featured;
        product.Specifications = JsonSerializer.Serialize(dto.Specifications ?? new Dictionary<string, string>());

        await _db.SaveChangesAsync();

        dto.Id = product.Id;
        dto.Category = product.Category?.Name ?? "";
        return Ok(dto);
    }

    /// <summary>
    /// DELETE /api/admin/products/{id}
    /// Deletes a product
    /// </summary>
    [HttpDelete("products/{id}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product == null)
            return NotFound(new { message = "Product not found." });

        _db.Products.Remove(product);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Product deleted." });
    }
}
