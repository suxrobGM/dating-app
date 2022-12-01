namespace Dating.Application.Contracts.Commands;

public class SetProfileMainPhoto : RequestBase
{
    public string? UserId { get; set; }
    public string? PhotoId { get; set; }
}