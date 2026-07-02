using Microsoft.AspNetCore.Mvc;
using BazaarHub.Backend.Services;
using BazaarHub.Backend.Models.ViewModels;

namespace BazaarHub.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService) => _productService = productService;

    /// <summary>
    /// GET /api/products?category=electronics&search=phone&minPrice=1000&maxPrice=50000&rating=4&sortBy=price-asc&page=1&pageSize=8
    /// Returns filtered, paginated product list with categories — uses ProductViewModel
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ProductViewModel>> GetProducts(
        [FromQuery] string? category,
        [FromQuery] string? search,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        [FromQuery] int? rating,
        [FromQuery] string? sortBy,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 8)
    {
        var result = await _productService.GetProductsAsync(category, search, minPrice, maxPrice, rating, sortBy, page, pageSize);
        return Ok(result);
    }

    /// <summary>
    /// GET /api/products/featured
    /// Returns featured products for homepage
    /// </summary>
    [HttpGet("featured")]
    public async Task<ActionResult<List<ProductDto>>> GetFeatured([FromQuery] int count = 8)
    {
        var result = await _productService.GetFeaturedProductsAsync(count);
        return Ok(result);
    }

    /// <summary>
    /// GET /api/products/samsung-galaxy-s25-ultra
    /// Returns full product detail with reviews and related products — uses ProductDetailViewModel
    /// </summary>
    [HttpGet("{slug}")]
    public async Task<ActionResult<ProductDetailViewModel>> GetProduct(string slug)
    {
        var result = await _productService.GetProductDetailAsync(slug);
        if (result == null) return NotFound(new { message = "Product not found" });
        return Ok(result);
    }
}
