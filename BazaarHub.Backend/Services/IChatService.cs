using BazaarHub.Backend.Models;

namespace BazaarHub.Backend.Services;

public interface IChatService
{
    Task<List<ChatMessage>> GetMessagesAsync(int userId, int otherUserId);
    Task<ChatMessage> SendMessageAsync(int senderId, int receiverId, string content, int? productId = null, int? quotedMessageId = null);
    Task MarkAsSeenAsync(List<int> messageIds);
    Task<List<object>> GetContactsAsync(int userId);
}
