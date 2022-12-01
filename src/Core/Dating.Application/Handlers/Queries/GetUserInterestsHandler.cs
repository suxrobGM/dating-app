namespace Dating.Application.Handlers.Queries;

internal class GetUserInterestsHandler : 
    IRequestHandler<GetUserInterestsQuery, ResponseResult<InterestDto[]>>
{
    private readonly IRepository _repository;

    public GetUserInterestsHandler(IRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<ResponseResult<InterestDto[]>> Handle(
        GetUserInterestsQuery request, CancellationToken cancellationToken)
    {
        var user = await _repository.GetAsync<User>(i => i.Id == request.UserId);
        
        if (user == null)
            return ResponseResult<InterestDto[]>.CreateError("Could not find the specified user");

        var interests = user.Interests.Select(i => new InterestDto(i.Id, i.Name)).ToArray();
        
        return ResponseResult<InterestDto[]>.CreateSuccess(interests);
    }
}