using Microsoft.AspNetCore.Mvc;
using BazaarHub.Backend.Services;
using BazaarHub.Backend.Models;

namespace BazaarHub.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;

    public ChatController(IChatService chatService) => _chatService = chatService;

    /// <summary>
    /// GET /api/chat/messages?userId=1&otherUserId=2
    /// Returns all messages between two users
    /// </summary>
    [HttpGet("messages")]
    public async Task<ActionResult<List<ChatMessage>>> GetMessages([FromQuery] int userId, [FromQuery] int otherUserId)
    {
        var messages = await _chatService.GetMessagesAsync(userId, otherUserId);
        return Ok(messages);
    }

    /// <summary>
    /// GET /api/chat/contacts?userId=1
    /// Returns list of contacts for a user
    /// </summary>
    [HttpGet("contacts")]
    public async Task<ActionResult> GetContacts([FromQuery] int userId)
    {
        var contacts = await _chatService.GetContactsAsync(userId);
        return Ok(contacts);
    }

    /// <summary>
    /// POST /api/chat/send
    /// Body: { senderId, receiverId, content, productId?, quotedMessageId? }
    /// Sends a chat message; can include product info and quoted reply
    /// </summary>
    [HttpPost("send")]
    public async Task<ActionResult<ChatMessage>> SendMessage([FromBody] SendMessageRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Content))
            return BadRequest(new { message = "Message content is required." });

        var msg = await _chatService.SendMessageAsync(
            request.SenderId, request.ReceiverId, request.Content,
            request.ProductId, request.QuotedMessageId);

        return Ok(msg);
    }

    /// <summary>
    /// POST /api/chat/seen
    /// Body: { messageIds: [1, 2, 3] }
    /// Marks messages as seen (double-tick)
    /// </summary>
    [HttpPost("seen")]
    public async Task<IActionResult> MarkAsSeen([FromBody] MarkSeenRequest request)
    {
        await _chatService.MarkAsSeenAsync(request.MessageIds);
        return Ok(new { message = "Messages marked as seen." });
    }
}

public class SendMessageRequest
{
    public int SenderId { get; set; }
    public int ReceiverId { get; set; }
    public string Content { get; set; } = "";
    public int? ProductId { get; set; }
    public int? QuotedMessageId { get; set; }
}

public class MarkSeenRequest
{
    public List<int> MessageIds { get; set; } = new();
}
