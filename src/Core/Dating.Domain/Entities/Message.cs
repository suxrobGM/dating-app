namespace Dating.Domain.Entities;

public class Message : Entity
{
    public string? TextContent { get; set; }
    public bool IsEdited { get; set; }
    public bool IsRead { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.Now;
    public string? SenderId { get; set; }
    public string? ReceiverId { get; set; }
    public virtual User? Sender { get; set; }
    public virtual User? Receiver { get; set; }
}