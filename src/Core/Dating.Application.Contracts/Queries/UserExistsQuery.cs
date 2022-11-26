namespace Dating.Application.Contracts.Queries;

public class UserExistsQuery : RequestBase<ResponseResult<bool>>
{
    public string? Email { get; set; }
}