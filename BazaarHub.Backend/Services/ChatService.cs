using Microsoft.EntityFrameworkCore;
using BazaarHub.Backend.Data;
using BazaarHub.Backend.Models;

namespace BazaarHub.Backend.Services;

public class ChatService : IChatService
{
    private readonly ApplicationDbContext _db;

    public ChatService(ApplicationDbContext db) => _db = db;

    public async Task<List<ChatMessage>> GetMessagesAsync(int userId, int otherUserId)
    {
        return await _db.ChatMessages
            .Include(m => m.QuotedMessage)
            .Where(m => (m.SenderId == userId && m.ReceiverId == otherUserId) ||
                        (m.SenderId == otherUserId && m.ReceiverId == userId))
            .OrderBy(m => m.CreatedAt)
            .ToListAsync();
    }

    public async Task<ChatMessage> SendMessageAsync(int senderId, int receiverId, string content, int? productId = null, int? quotedMessageId = null)
    {
        var msg = new ChatMessage
        {
            SenderId = senderId, ReceiverId = receiverId,
            Content = content, ProductId = productId,
            QuotedMessageId = quotedMessageId,
            Status = "sent", CreatedAt = DateTime.UtcNow
        };

        if (productId.HasValue)
        {
            var product = await _db.Products.FindAsync(productId.Value);
            if (product != null)
            {
                msg.ProductName = product.Name;
                msg.ProductImage = product.Images;
                msg.ProductPrice = product.Price;
            }
        }

        _db.ChatMessages.Add(msg);
        await _db.SaveChangesAsync();
        return msg;
    }

    public async Task MarkAsSeenAsync(List<int> messageIds)
    {
        var messages = await _db.ChatMessages.Where(m => messageIds.Contains(m.Id)).ToListAsync();
        foreach (var m in messages) m.Status = "seen";
        await _db.SaveChangesAsync();
    }

    public async Task<List<object>> GetContactsAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId);
        if (user == null) return new();

        var otherUsers = user.Role == "admin"
            ? await _db.Users.Where(u => u.Role == "user").ToListAsync()
            : await _db.Users.Where(u => u.Role == "admin").ToListAsync();

        var contacts = new List<object>();
        foreach (var u in otherUsers)
        {
            var lastMsg = await _db.ChatMessages
                .Where(m => (m.SenderId == userId && m.ReceiverId == u.Id) || (m.SenderId == u.Id && m.ReceiverId == userId))
                .OrderByDescending(m => m.CreatedAt)
                .FirstOrDefaultAsync();

            // Admin: only show contacts who have sent at least one message
            if (user.Role == "admin" && lastMsg == null) continue;

            var unread = await _db.ChatMessages
                .CountAsync(m => m.SenderId == u.Id && m.ReceiverId == userId && m.Status != "seen");

            contacts.Add(new
            {
                userId = u.Id,
                userName = u.FullName,
                userAvatar = u.Avatar,
                lastMessage = lastMsg?.Content ?? "No messages yet",
                lastMessageTime = lastMsg?.CreatedAt.ToString("o") ?? "",
                unreadCount = unread,
                isOnline = true
            });
        }
        return contacts;
    }
}
