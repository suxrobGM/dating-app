namespace Dating.Application.Contracts.Commands;

public class SetProfileMainPhotoCommand : RequestBase
{
    public string? UserId { get; set; }
    public string? PhotoId { get; set; }
}