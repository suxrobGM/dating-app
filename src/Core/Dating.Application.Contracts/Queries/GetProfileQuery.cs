namespace Dating.Application.Contracts.Queries;

public class GetProfileQuery : RequestBase<ResponseResult<ProfileDto>>
{
    public string? Id { get; set; }
}