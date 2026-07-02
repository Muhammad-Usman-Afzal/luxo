using Microsoft.EntityFrameworkCore;
using BazaarHub.Backend.Data;
using BazaarHub.Backend.Models;
using BazaarHub.Backend.Models.ViewModels;

namespace BazaarHub.Backend.Services;

public class AccountService : IAccountService
{
    private readonly ApplicationDbContext _db;

    public AccountService(ApplicationDbContext db) => _db = db;

    public async Task<UserDto?> AuthenticateAsync(string email, string password)
    {
        var hash = HashPassword(password);
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == hash);
        return user == null ? null : MapToDto(user);
    }

    public async Task<UserDto?> RegisterAsync(string fullName, string email, string password, string phone)
    {
        if (await _db.Users.AnyAsync(u => u.Email == email)) return null;

        var user = new User
        {
            FullName = fullName, Email = email,
            PasswordHash = HashPassword(password), Phone = phone,
            Role = "user", CreatedAt = DateTime.UtcNow
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return MapToDto(user);
    }

    public async Task<UserDto?> GetUserByIdAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId);
        return user == null ? null : MapToDto(user);
    }

    public async Task<UserDashboardViewModel> GetUserDashboardAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId);
        var orders = await _db.Orders.Include(o => o.Items).Where(o => o.UserId == userId).OrderByDescending(o => o.CreatedAt).Take(5).ToListAsync();
        var wishlistCount = 0; // Implement if Wishlist table exists
        var cartCount = await _db.Carts.CountAsync(c => c.UserId == userId);
        var totalOrders = await _db.Orders.CountAsync(o => o.UserId == userId);

        return new UserDashboardViewModel
        {
            User = MapToDto(user!),
            RecentOrders = orders.Select(o => new OrderDto
            {
                Id = o.Id, UserId = o.UserId, OrderNumber = o.OrderNumber,
                Subtotal = o.Subtotal, Shipping = o.Shipping, Tax = o.Tax, Total = o.Total,
                Status = o.Status, PaymentMethod = o.PaymentMethod, ShippingAddress = o.ShippingAddress,
                CreatedAt = o.CreatedAt, DeliveredAt = o.DeliveredAt,
                Items = o.Items.Select(i => new OrderItemDto { Id = i.Id, ProductId = i.ProductId, ProductName = i.ProductName, ProductImage = i.ProductImage, Price = i.Price, Quantity = i.Quantity, Size = i.Size, Color = i.Color }).ToList()
            }).ToList(),
            WishlistCount = wishlistCount, CartCount = cartCount, TotalOrders = totalOrders
        };
    }

    public async Task<UserDto?> UpdateProfileAsync(int userId, string? phone, string? city, string? address)
    {
        var user = await _db.Users.FindAsync(userId);
        if (user == null) return null;

        if (phone != null) user.Phone = phone;
        if (city != null) user.City = city;
        if (address != null) user.Address = address;

        await _db.SaveChangesAsync();
        return MapToDto(user);
    }

    private static string HashPassword(string password)
    {
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var bytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }

    private static UserDto MapToDto(User u) => new()
    {
        Id = u.Id, FullName = u.FullName, Email = u.Email, Role = u.Role,
        Phone = u.Phone, Avatar = u.Avatar, Address = u.Address, City = u.City, CreatedAt = u.CreatedAt
    };
}
