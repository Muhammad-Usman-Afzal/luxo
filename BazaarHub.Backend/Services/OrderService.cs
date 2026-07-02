using Microsoft.EntityFrameworkCore;
using BazaarHub.Backend.Data;
using BazaarHub.Backend.Models;
using BazaarHub.Backend.Models.ViewModels;

namespace BazaarHub.Backend.Services;

public class OrderService : IOrderService
{
    private readonly ApplicationDbContext _db;

    public OrderService(ApplicationDbContext db) => _db = db;

    public async Task<List<OrderDto>> GetUserOrdersAsync(int userId)
    {
        var orders = await _db.Orders
            .Include(o => o.Items)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();
        return orders.Select(MapToDto).ToList();
    }

    public async Task<OrderDto?> GetOrderByIdAsync(int orderId)
    {
        var order = await _db.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == orderId);
        return order == null ? null : MapToDto(order);
    }

    public async Task<OrderDto> CreateOrderAsync(int userId, string paymentMethod, string address, string phone, string city)
    {
        var cartItems = await _db.Carts.Include(c => c.Product).Where(c => c.UserId == userId).ToListAsync();
        if (!cartItems.Any()) throw new InvalidOperationException("Cart is empty.");

        var subtotal = cartItems.Sum(c => c.Product!.Price * c.Quantity);
        var shipping = subtotal >= 5000 ? 0 : 200;
        var total = subtotal + shipping;

        var order = new Order
        {
            UserId = userId,
            OrderNumber = $"ORD-{DateTime.UtcNow:yyyyMMdd}-{new Random().Next(1000, 9999)}",
            Subtotal = subtotal, Shipping = shipping, Tax = 0, Total = total,
            Status = "pending", PaymentMethod = paymentMethod,
            ShippingAddress = $"{address}, {city}", CreatedAt = DateTime.UtcNow
        };

        _db.Orders.Add(order);
        await _db.SaveChangesAsync();

        var orderItems = cartItems.Select(c => new OrderItem
        {
            OrderId = order.Id,
            ProductId = c.ProductId,
            ProductName = c.Product!.Name,
            ProductImage = c.Product.Images.Contains('[') ? "https://images.unsplash.com/photo-default" : c.Product.Images,
            Price = c.Product.Price,
            Quantity = c.Quantity,
            Size = c.Size,
            Color = c.Color
        }).ToList();

        _db.OrderItems.AddRange(orderItems);
        _db.Carts.RemoveRange(cartItems);
        await _db.SaveChangesAsync();

        return MapToDto(order);
    }

    public async Task<List<OrderDto>> GetAllOrdersAsync()
    {
        var orders = await _db.Orders.Include(o => o.Items).OrderByDescending(o => o.CreatedAt).ToListAsync();
        return orders.Select(MapToDto).ToList();
    }

    public async Task<bool> UpdateOrderStatusAsync(int orderId, string status)
    {
        var order = await _db.Orders.FindAsync(orderId);
        if (order == null) return false;
        order.Status = status;
        if (status == "delivered") order.DeliveredAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return true;
    }

    private static OrderDto MapToDto(Order o) => new()
    {
        Id = o.Id, UserId = o.UserId, OrderNumber = o.OrderNumber,
        Subtotal = o.Subtotal, Shipping = o.Shipping, Tax = o.Tax, Total = o.Total,
        Status = o.Status, PaymentMethod = o.PaymentMethod, ShippingAddress = o.ShippingAddress,
        CreatedAt = o.CreatedAt, DeliveredAt = o.DeliveredAt,
        Items = o.Items.Select(i => new OrderItemDto
        {
            Id = i.Id, ProductId = i.ProductId, ProductName = i.ProductName,
            ProductImage = i.ProductImage, Price = i.Price, Quantity = i.Quantity,
            Size = i.Size, Color = i.Color
        }).ToList()
    };
}
