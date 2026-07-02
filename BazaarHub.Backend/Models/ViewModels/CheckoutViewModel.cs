namespace BazaarHub.Backend.Models.ViewModels;

public class CheckoutViewModel
{
    public List<CartItemDto> CartItems { get; set; } = new();
    public decimal Subtotal { get; set; }
    public decimal Shipping { get; set; }
    public decimal Tax { get; set; }
    public decimal Total { get; set; }
    public List<string> UserAddresses { get; set; } = new();
}

public class CartItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public ProductDto Product { get; set; } = new();
    public int Quantity { get; set; }
    public string? Size { get; set; }
    public string? Color { get; set; }
}
