namespace BazaarHub.Backend.Models.ViewModels;

public class UserDashboardViewModel
{
    public UserDto User { get; set; } = new();
    public List<OrderDto> RecentOrders { get; set; } = new();
    public int WishlistCount { get; set; }
    public int CartCount { get; set; }
    public int TotalOrders { get; set; }
}

public class AdminDashboardViewModel
{
    public decimal TotalSales { get; set; }
    public int TotalOrders { get; set; }
    public int TotalUsers { get; set; }
    public int TotalProducts { get; set; }
    public List<OrderDto> RecentOrders { get; set; } = new();
    public List<ProductDto> TopProducts { get; set; } = new();
    public List<SalesChartDto> SalesChart { get; set; } = new();
    public List<OrderStatusDto> OrderStatusDistribution { get; set; } = new();
}

public class UserDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Role { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Avatar { get; set; } = "";
    public string? Address { get; set; }
    public string? City { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class OrderDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string OrderNumber { get; set; } = "";
    public List<OrderItemDto> Items { get; set; } = new();
    public decimal Subtotal { get; set; }
    public decimal Shipping { get; set; }
    public decimal Tax { get; set; }
    public decimal Total { get; set; }
    public string Status { get; set; } = "";
    public string PaymentMethod { get; set; } = "";
    public string ShippingAddress { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public DateTime? DeliveredAt { get; set; }
}

public class OrderItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = "";
    public string ProductImage { get; set; } = "";
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public string? Size { get; set; }
    public string? Color { get; set; }
}

public class SalesChartDto
{
    public string Month { get; set; } = "";
    public decimal Sales { get; set; }
}

public class OrderStatusDto
{
    public string Status { get; set; } = "";
    public int Count { get; set; }
}
