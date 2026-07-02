using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BazaarHub.Backend.Models;

public class Cart
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public User? User { get; set; }

    public int ProductId { get; set; }

    [ForeignKey("ProductId")]
    public Product? Product { get; set; }

    public int Quantity { get; set; } = 1;

    [MaxLength(20)]
    public string? Size { get; set; }

    [MaxLength(50)]
    public string? Color { get; set; }
}
