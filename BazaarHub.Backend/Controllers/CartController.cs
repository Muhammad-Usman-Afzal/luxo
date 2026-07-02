using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BazaarHub.Backend.Data;
using BazaarHub.Backend.Models;
using BazaarHub.Backend.Models.ViewModels;

namespace BazaarHub.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public CartController(ApplicationDbContext db) => _db = db;

    /// <summary>
    /// GET /api/cart/1
    /// Returns cart items with product details for a user — uses CheckoutViewModel
    /// </summary>
    [HttpGet("{userId:int}")]
    public async Task<ActionResult<CheckoutViewModel>> GetCart(int userId)
    {
        var items = await _db.Carts
            .Include(c => c.Product)
            .Where(c => c.UserId == userId)
            .ToListAsync();

        var subtotal = items.Sum(i => i.Product!.Price * i.Quantity);
        var shipping = subtotal >= 5000 ? 0 : 200;

        return Ok(new CheckoutViewModel
        {
            CartItems = items.Select(c => new CartItemDto
            {
                Id = c.Id,
                ProductId = c.ProductId,
                Quantity = c.Quantity,
                Size = c.Size,
                Color = c.Color,
                Product = new ProductDto
                {
                    Id = c.Product!.Id, Name = c.Product.Name, Slug = c.Product.Slug,
                    Price = c.Product.Price, OriginalPrice = c.Product.OriginalPrice,
                    Discount = c.Product.Discount, Brand = c.Product.Brand,
                    Rating = c.Product.Rating, ReviewCount = c.Product.ReviewCount,
                    Stock = c.Product.Stock, DeliveryDays = c.Product.DeliveryDays,
                    FreeShipping = c.Product.FreeShipping,
                    Images = System.Text.Json.JsonSerializer.Deserialize<List<string>>(c.Product.Images) ?? new(),
                }
            }).ToList(),
            Subtotal = subtotal,
            Shipping = shipping,
            Tax = 0,
            Total = subtotal + shipping,
        });
    }

    /// <summary>
    /// POST /api/cart
    /// Body: { userId, productId, quantity, size?, color? }
    /// Adds item to cart or increments quantity
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> AddToCart([FromBody] AddToCartRequest request)
    {
        var existing = await _db.Carts.FirstOrDefaultAsync(c =>
            c.UserId == request.UserId && c.ProductId == request.ProductId &&
            c.Size == request.Size && c.Color == request.Color);

        if (existing != null)
        {
            existing.Quantity += request.Quantity;
        }
        else
        {
            _db.Carts.Add(new Cart
            {
                UserId = request.UserId,
                ProductId = request.ProductId,
                Quantity = request.Quantity,
                Size = request.Size,
                Color = request.Color
            });
        }

        await _db.SaveChangesAsync();
        var count = await _db.Carts.CountAsync(c => c.UserId == request.UserId);
        return Ok(new { message = "Added to cart", cartCount = count });
    }

    /// <summary>
    /// DELETE /api/cart/5
    /// Removes an item from cart
    /// </summary>
    [HttpDelete("{cartItemId:int}")]
    public async Task<IActionResult> RemoveFromCart(int cartItemId)
    {
        var item = await _db.Carts.FindAsync(cartItemId);
        if (item == null) return NotFound(new { message = "Cart item not found." });
        _db.Carts.Remove(item);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Removed from cart" });
    }

    /// <summary>
    /// PATCH /api/cart/5
    /// Body: { quantity }
    /// Updates item quantity
    /// </summary>
    [HttpPatch("{cartItemId:int}")]
    public async Task<IActionResult> UpdateQuantity(int cartItemId, [FromBody] UpdateQuantityRequest request)
    {
        var item = await _db.Carts.FindAsync(cartItemId);
        if (item == null) return NotFound(new { message = "Cart item not found." });
        if (request.Quantity < 1) return BadRequest(new { message = "Quantity must be at least 1." });
        item.Quantity = request.Quantity;
        await _db.SaveChangesAsync();
        return Ok(new { message = "Quantity updated" });
    }
}

public class AddToCartRequest
{
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; } = 1;
    public string? Size { get; set; }
    public string? Color { get; set; }
}

public class UpdateQuantityRequest
{
    public int Quantity { get; set; }
}
