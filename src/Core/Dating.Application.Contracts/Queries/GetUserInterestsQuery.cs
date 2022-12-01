namespace Dating.Application.Contracts.Queries;

public class GetUserInterestsQuery : RequestBase<ResponseResult<InterestDto[]>>
{
    public GetUserInterestsQuery(string userId)
    {
        UserId = userId;
    }
    
    public string UserId { get; set; }
}