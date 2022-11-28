namespace Dating.Application.Contracts.Queries;

public class GetProfileQuery : RequestBase<ResponseResult<ProfileDto>>
{
    public string? UserId { get; set; }
}