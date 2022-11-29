namespace Dating.Application.Handlers.Queries;

internal class GetProfileHandler : IRequestHandler<GetProfileQuery, ResponseResult<ProfileDto>>
{
    private readonly IRepository _repository;
    
    public GetProfileHandler(IRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<ResponseResult<ProfileDto>> Handle(GetProfileQuery request, CancellationToken cancellationToken)
    {
        var profile = await _repository.GetAsync<Profile>(i => i.Id == request.Id || i.UserId == request.Id);

        if (profile == null)
        {
            return ResponseResult<ProfileDto>.CreateError("Could not find a profile for the specified user ID");
        }

        var profileDto = new ProfileDto
        {
            FirstName = profile.User!.FirstName,
            LastName = profile.User!.LastName,
            Birthdate = profile.User!.Birthdate,
            Gender = profile.User!.Gender,
            Bio = profile.Bio,
            School = profile.School,
            JobTitle = profile.JobTitle,
            Company = profile.Company,
            Orientation = profile.Orientation,
            LivingCity = profile.LivingCity,
            IsVerified = profile.IsVerified
        };

        return ResponseResult<ProfileDto>.CreateSuccess(profileDto);
    }
}