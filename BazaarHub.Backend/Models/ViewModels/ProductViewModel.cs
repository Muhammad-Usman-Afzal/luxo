namespace BazaarHub.Backend.Models.ViewModels;

public class ProductViewModel
{
    public List<ProductDto> Products { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public List<CategoryDto> Categories { get; set; } = new();
    public decimal MinPrice { get; set; }
    public decimal MaxPrice { get; set; }
}

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Slug { get; set; } = "";
    public string Description { get; set; } = "";
    public decimal Price { get; set; }
    public decimal OriginalPrice { get; set; }
    public int Discount { get; set; }
    public List<string> Images { get; set; } = new();
    public int CategoryId { get; set; }
    public string Category { get; set; } = "";
    public string Brand { get; set; } = "";
    public double Rating { get; set; }
    public int ReviewCount { get; set; }
    public int Stock { get; set; }
    public List<string> Sizes { get; set; } = new();
    public List<string> Colors { get; set; } = new();
    public int DeliveryDays { get; set; }
    public bool FreeShipping { get; set; }
    public bool Featured { get; set; }
    public DateTime CreatedAt { get; set; }
    public Dictionary<string, string> Specifications { get; set; } = new();
}

public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Slug { get; set; } = "";
    public string Icon { get; set; } = "";
    public string? Image { get; set; }
    public int? ParentId { get; set; }
}
