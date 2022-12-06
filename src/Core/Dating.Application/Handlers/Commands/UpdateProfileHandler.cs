namespace Dating.Application.Handlers.Commands;

internal class UpdateProfileHandler : IRequestHandler<UpdateProfileCommand, ResponseResult>
{
    private readonly IRepository _repository;

    public UpdateProfileHandler(IRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<ResponseResult> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
    {
        var profile = await _repository.GetAsync<Profile>(i => i.Id == request.Id || i.UserId == request.Id);

        if (profile == null)
            return ResponseResult<ProfileDto>.CreateError("Could not find the specified profile");

        if (!string.IsNullOrEmpty(request.FirstName))
        {
            profile.User!.FirstName = request.FirstName;
        }
        if (!string.IsNullOrEmpty(request.LastName))
        {
            profile.User!.LastName = request.LastName;
        }
        if (request.Gender != null)
        {
            profile.User!.Gender = request.Gender.Value;
        }
        if (request.Birthdate != null)
        {
            profile.User!.Birthdate = request.Birthdate.Value;
        }
        if (!string.IsNullOrEmpty(request.Bio))
        {
            profile.Bio = request.Bio;
        }
        if (!string.IsNullOrEmpty(request.LivingCity))
        {
            profile.LivingCity = request.LivingCity;
        }
        if (!string.IsNullOrEmpty(request.School))
        {
            profile.School = request.School;
        }
        if (!string.IsNullOrEmpty(request.JobTitle))
        {
            profile.JobTitle = request.JobTitle;
        }
        if (!string.IsNullOrEmpty(request.Company))
        {
            profile.Company = request.Company;
        }
        if (request.Orientation != null)
        {
            profile.Orientation = request.Orientation.Value;
        }
        
        _repository.Update(profile);
        await _repository.UnitOfWork.SaveChangesAsync();
        return ResponseResult.CreateSuccess();
    }
}