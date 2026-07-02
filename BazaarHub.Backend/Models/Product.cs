using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BazaarHub.Backend.Models;

public class Product
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(250)]
    public string Slug { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal OriginalPrice { get; set; }

    public int Discount { get; set; }

    public string Images { get; set; } = "[]"; // JSON array stored as string

    public int CategoryId { get; set; }

    [ForeignKey("CategoryId")]
    public Category? Category { get; set; }

    [MaxLength(100)]
    public string Brand { get; set; } = string.Empty;

    public double Rating { get; set; }

    public int ReviewCount { get; set; }

    public int Stock { get; set; }

    [MaxLength(200)]
    public string Sizes { get; set; } = "[]"; // JSON array

    [MaxLength(300)]
    public string Colors { get; set; } = "[]"; // JSON array

    public int DeliveryDays { get; set; } = 3;

    public bool FreeShipping { get; set; }

    public bool Featured { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string Specifications { get; set; } = "{}"; // JSON object

    // Navigation
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    public ICollection<Cart> CartItems { get; set; } = new List<Cart>();
}
