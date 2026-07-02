namespace BazaarHub.Backend.Models.ViewModels;

public class ProductDetailViewModel
{
    public ProductDto Product { get; set; } = new();
    public List<ReviewDto> Reviews { get; set; } = new();
    public List<ProductDto> RelatedProducts { get; set; } = new();
    public double AverageRating { get; set; }
}

public class ReviewDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } = "";
    public string UserAvatar { get; set; } = "";
    public int Rating { get; set; }
    public string Comment { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}
