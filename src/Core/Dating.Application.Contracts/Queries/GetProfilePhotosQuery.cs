namespace Dating.Application.Contracts.Queries;

public class GetProfilePicturesQuery : RequestBase<ResponseResult<ProfilePhotoDto>>
{
    public GetProfilePicturesQuery(string userId)
    {
        UserId = userId;
    }
    
    public string UserId { get; set; }
}