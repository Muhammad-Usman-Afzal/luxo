namespace BazaarHub.Backend.Services;

public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;

    public EmailService(ILogger<EmailService> logger) => _logger = logger;

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        // In production: integrate with SMTP (SendGrid, Mailgun, etc.)
        _logger.LogInformation($"📧 EMAIL to {to}: [{subject}] {body}");
        await Task.CompletedTask;
    }

    public async Task SendOrderConfirmationAsync(string email, string orderNumber, decimal total)
    {
        var subject = $"BazaarHub Order Confirmation — #{orderNumber}";
        var body = $"Thank you for your order! Your order #{orderNumber} for Rs. {total:N0} has been received. We'll notify you when it ships.";
        await SendEmailAsync(email, subject, body);
    }
}
