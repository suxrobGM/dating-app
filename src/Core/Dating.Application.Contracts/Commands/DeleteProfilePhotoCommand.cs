namespace Dating.Application.Contracts.Commands;

public class DeleteProfilePhotoCommand : RequestBase
{
    public string? UserId { get; set; }
    public string? PhotoId { get; set; }
}