using Microsoft.AspNetCore.Mvc;
using BazaarHub.Backend.Services;
using BazaarHub.Backend.Models.ViewModels;

namespace BazaarHub.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService) => _accountService = accountService;

    /// <summary>
    /// POST /api/account/login
    /// Body: { email, password }
    /// Returns UserDto or 401
    /// </summary>
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login([FromBody] LoginRequest request)
    {
        var user = await _accountService.AuthenticateAsync(request.Email, request.Password);
        if (user == null) return Unauthorized(new { message = "Invalid email or password." });
        return Ok(user);
    }

    /// <summary>
    /// POST /api/account/register
    /// Body: { fullName, email, password, phone }
    /// Returns UserDto or 400
    /// </summary>
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register([FromBody] RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FullName) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { message = "FullName, Email, and Password are required." });

        if (request.Password.Length < 6)
            return BadRequest(new { message = "Password must be at least 6 characters." });

        var user = await _accountService.RegisterAsync(request.FullName, request.Email, request.Password, request.Phone ?? "");
        if (user == null) return BadRequest(new { message = "Email already registered." });

        return Ok(user);
    }

    /// <summary>
    /// GET /api/account/dashboard/{userId}
    /// Returns UserDashboardViewModel
    /// </summary>
    [HttpGet("dashboard/{userId:int}")]
    public async Task<ActionResult<UserDashboardViewModel>> GetDashboard(int userId)
    {
        var user = await _accountService.GetUserByIdAsync(userId);
        if (user == null) return NotFound(new { message = "User not found." });
        var dashboard = await _accountService.GetUserDashboardAsync(userId);
        return Ok(dashboard);
    }

    /// <summary>
    /// PUT /api/account/profile
    /// Body: { userId, phone?, city?, address? }
    /// Returns updated UserDto
    /// </summary>
    [HttpPut("profile")]
    public async Task<ActionResult<UserDto>> UpdateProfile([FromBody] UpdateProfileRequest request)
    {
        var user = await _accountService.UpdateProfileAsync(request.UserId, request.Phone, request.City, request.Address);
        if (user == null) return NotFound(new { message = "User not found." });
        return Ok(user);
    }
}

public class LoginRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}

public class RegisterRequest
{
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public string? Phone { get; set; }
}

public class UpdateProfileRequest
{
    public int UserId { get; set; }
    public string? Phone { get; set; }
    public string? City { get; set; }
    public string? Address { get; set; }
}
