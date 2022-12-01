namespace Dating.Application.Contracts.Commands;

public class UploadProfilePhotoCommand : RequestBase<ResponseResult<ProfilePhotoDto>>
{
    public string? UserId { get; set; }
    public string? PhotoUrl { get; set; }
}