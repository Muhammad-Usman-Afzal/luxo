using BazaarHub.Backend.Models.ViewModels;

namespace BazaarHub.Backend.Services;

public interface IOrderService
{
    Task<List<OrderDto>> GetUserOrdersAsync(int userId);
    Task<OrderDto?> GetOrderByIdAsync(int orderId);
    Task<OrderDto> CreateOrderAsync(int userId, string paymentMethod, string address, string phone, string city);
    Task<List<OrderDto>> GetAllOrdersAsync();
    Task<bool> UpdateOrderStatusAsync(int orderId, string status);
}
