using Microsoft.AspNetCore.Mvc;
using BazaarHub.Backend.Services;
using BazaarHub.Backend.Models.ViewModels;

namespace BazaarHub.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IEmailService _emailService;

    public OrdersController(IOrderService orderService, IEmailService emailService)
    {
        _orderService = orderService;
        _emailService = emailService;
    }

    /// <summary>
    /// GET /api/orders/user/1
    /// Returns all orders for a user
    /// </summary>
    [HttpGet("user/{userId:int}")]
    public async Task<ActionResult<List<OrderDto>>> GetUserOrders(int userId)
    {
        var orders = await _orderService.GetUserOrdersAsync(userId);
        return Ok(orders);
    }

    /// <summary>
    /// GET /api/orders/5
    /// Returns a single order by ID
    /// </summary>
    [HttpGet("{orderId:int}")]
    public async Task<ActionResult<OrderDto>> GetOrder(int orderId)
    {
        var order = await _orderService.GetOrderByIdAsync(orderId);
        if (order == null) return NotFound(new { message = "Order not found." });
        return Ok(order);
    }

    /// <summary>
    /// POST /api/orders
    /// Body: { userId, paymentMethod, address, phone, city }
    /// Creates order from cart and sends confirmation email — returns OrderDto
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderRequest request)
    {
        try
        {
            var order = await _orderService.CreateOrderAsync(
                request.UserId, request.PaymentMethod, request.Address, request.Phone, request.City);

            // Send confirmation email
            await _emailService.SendOrderConfirmationAsync(
                $"user{request.UserId}@bazaarhub.pk", order.OrderNumber, order.Total);

            return Ok(order);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>
    /// PATCH /api/orders/5/status
    /// Body: { status }
    /// Admin only — updates order status
    /// </summary>
    [HttpPatch("{orderId:int}/status")]
    public async Task<IActionResult> UpdateStatus(int orderId, [FromBody] UpdateStatusRequest request)
    {
        var success = await _orderService.UpdateOrderStatusAsync(orderId, request.Status);
        if (!success) return NotFound(new { message = "Order not found." });
        return Ok(new { message = $"Order status updated to {request.Status}." });
    }
}

public class CreateOrderRequest
{
    public int UserId { get; set; }
    public string PaymentMethod { get; set; } = "cod";
    public string Address { get; set; } = "";
    public string Phone { get; set; } = "";
    public string City { get; set; } = "";
}

public class UpdateStatusRequest
{
    public string Status { get; set; } = "";
}
