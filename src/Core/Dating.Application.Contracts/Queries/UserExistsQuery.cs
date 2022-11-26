namespace Dating.Application.Contracts.Queries;

public class CheckEmailQuery : RequestBase<ResponseResult<bool>>
{
    public string? Email { get; set; }
}