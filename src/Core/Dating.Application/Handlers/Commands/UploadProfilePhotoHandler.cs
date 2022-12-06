namespace Dating.Application.Handlers.Commands;

internal class UploadProfilePhotoHandler 
    : IRequestHandler<UploadProfilePhotoCommand, ResponseResult<ProfilePhotoDto>>
{
    private readonly IRepository _repository;

    public UploadProfilePhotoHandler(IRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<ResponseResult<ProfilePhotoDto>> Handle(
        UploadProfilePhotoCommand request, CancellationToken cancellationToken)
    {
        var profile = await _repository.GetAsync<Profile>(i => i.UserId == request.UserId);

        if (profile == null)
            return ResponseResult<ProfilePhotoDto>.CreateError("Could not find the specified user profile");

        if (profile.Photos.Count >= 10)
        {
            // TODO: remove uploading image from AWS in case any failures
            return ResponseResult<ProfilePhotoDto>.CreateError("Can not upload more than 10 profile pictures, remove other image then upload a new photo");
        }
        
        var profilePhoto = profile.AddPhoto(new Media(request.PhotoUrl!, "image/jpeg"));

        var profilePhotoDto = new ProfilePhotoDto()
        {
            PhotoId = profilePhoto.PhotoId,
            PhotoUrl = profilePhoto.Photo!.Url,
            IsMainPhoto = profilePhoto.IsMainPhoto
        };
        
        await _repository.UnitOfWork.SaveChangesAsync();
        return ResponseResult<ProfilePhotoDto>.CreateSuccess(profilePhotoDto);
    }
}