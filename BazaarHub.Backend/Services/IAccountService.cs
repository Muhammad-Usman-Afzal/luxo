using BazaarHub.Backend.Models.ViewModels;

namespace BazaarHub.Backend.Services;

public interface IAccountService
{
    Task<UserDto?> AuthenticateAsync(string email, string password);
    Task<UserDto?> RegisterAsync(string fullName, string email, string password, string phone);
    Task<UserDto?> GetUserByIdAsync(int userId);
    Task<UserDashboardViewModel> GetUserDashboardAsync(int userId);
    Task<UserDto?> UpdateProfileAsync(int userId, string? phone, string? city, string? address);
}
