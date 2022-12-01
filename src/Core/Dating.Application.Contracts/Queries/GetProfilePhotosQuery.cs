namespace Dating.Application.Contracts.Queries;

public class GetProfilePhotosQuery : RequestBase<ResponseResult<ProfilePhotoDto[]>>
{
    public GetProfilePhotosQuery(string userId)
    {
        UserId = userId;
    }
    
    public string UserId { get; set; }
}