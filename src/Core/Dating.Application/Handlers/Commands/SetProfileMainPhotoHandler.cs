namespace Dating.Application.Handlers.Commands;

internal class UploadProfilePhotoHandler : IRequestHandler<UploadProfilePhotoCommand, ResponseResult>
{
    private readonly IRepository _repository;

    public UploadProfilePhotoHandler(IRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<ResponseResult> Handle(UploadProfilePhotoCommand request, CancellationToken cancellationToken)
    {
        var profile = await _repository.GetAsync<Profile>(i => i.UserId == request.UserId);

        if (profile == null)
            return ResponseResult.CreateError("Could not find the specified user profile");
        
        profile.AddPhoto(new Media(request.PhotoUrl!, "image/jpeg"));
        await _repository.UnitOfWork.SaveChangesAsync();
        return ResponseResult.CreateSuccess();
    }
}