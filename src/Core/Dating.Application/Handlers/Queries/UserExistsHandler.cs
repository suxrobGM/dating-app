namespace Dating.Application.Handlers.Queries;

internal class UserExistsHandler : IRequestHandler<UserExistsQuery, ResponseResult<bool>>
{
    private readonly IRepository _repository;

    public UserExistsHandler(IRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<ResponseResult<bool>> Handle(UserExistsQuery request, CancellationToken cancellationToken)
    {
        var user = await _repository.GetAsync<User>(i => i.Email == request.Email);
        return ResponseResult<bool>.CreateSuccess(user != null);
    }
}