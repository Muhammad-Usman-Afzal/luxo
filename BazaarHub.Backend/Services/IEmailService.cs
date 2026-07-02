namespace BazaarHub.Backend.Services;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
    Task SendOrderConfirmationAsync(string email, string orderNumber, decimal total);
}
