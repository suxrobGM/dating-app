namespace Dating.Application.Handlers.Commands;

internal class SetProfileMainPhotoHandler : IRequestHandler<SetProfileMainPhotoCommand, ResponseResult>
{
    private readonly IRepository _repository;

    public SetProfileMainPhotoHandler(IRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<ResponseResult> Handle(SetProfileMainPhotoCommand request, CancellationToken cancellationToken)
    {
        var profile = await _repository.GetAsync<Profile>(i => i.UserId == request.UserId);

        if (profile == null)
            return ResponseResult.CreateError("Could not find the specified user profile");

        var profilePhoto = profile.Photos.FirstOrDefault(i => i.PhotoId == request.PhotoId);
        
        if (profilePhoto == null)
            return ResponseResult.CreateError("Could not find the specified profile photo from user pictures");
        
        profile.SetMainPhoto(profilePhoto);
        await _repository.UnitOfWork.SaveChangesAsync();
        return ResponseResult.CreateSuccess();
    }
}