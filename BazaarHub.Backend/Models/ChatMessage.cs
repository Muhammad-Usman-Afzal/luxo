using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BazaarHub.Backend.Models;

public class ChatMessage
{
    [Key]
    public int Id { get; set; }

    public int SenderId { get; set; }

    [ForeignKey("SenderId")]
    public User? Sender { get; set; }

    public int ReceiverId { get; set; }

    [ForeignKey("ReceiverId")]
    public User? Receiver { get; set; }

    public int? ProductId { get; set; }

    [MaxLength(200)]
    public string? ProductName { get; set; }

    [MaxLength(500)]
    public string? ProductImage { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal? ProductPrice { get; set; }

    [MaxLength(2000)]
    public string Content { get; set; } = string.Empty;

    public int? QuotedMessageId { get; set; }

    [ForeignKey("QuotedMessageId")]
    public ChatMessage? QuotedMessage { get; set; }

    [MaxLength(20)]
    public string Status { get; set; } = "sent"; // sent, delivered, seen

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
