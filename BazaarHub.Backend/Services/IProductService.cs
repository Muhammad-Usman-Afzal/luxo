using BazaarHub.Backend.Models.ViewModels;

namespace BazaarHub.Backend.Services;

public interface IProductService
{
    Task<ProductViewModel> GetProductsAsync(string? category, string? search, decimal? minPrice, decimal? maxPrice, int? rating, string? sortBy, int page, int pageSize);
    Task<ProductDetailViewModel?> GetProductDetailAsync(string slug);
    Task<List<ProductDto>> GetFeaturedProductsAsync(int count = 8);
    Task<List<ProductDto>> GetRelatedProductsAsync(int productId, int categoryId, int count = 4);
}
