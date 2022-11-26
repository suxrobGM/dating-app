namespace Dating.Application.Handlers.Queries;

internal class CheckEmailHandler : IRequestHandler<UserExistsQuery, ResponseResult<bool>>
{
    private readonly IRepository _repository;

    public CheckEmailHandler(IRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<ResponseResult<bool>> Handle(UserExistsQuery request, CancellationToken cancellationToken)
    {
        var userExists = await _repository.GetAsync<User>(i => i.Email == request.Email);
        return ResponseResult<bool>.CreateSuccess(userExists != null);
    }
}