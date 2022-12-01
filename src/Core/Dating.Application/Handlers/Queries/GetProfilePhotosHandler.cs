namespace Dating.Application.Handlers.Queries;

internal class GetProfilePhotosHandler 
    : IRequestHandler<GetProfilePhotosQuery, ResponseResult<ProfilePhotoDto[]>>
{
    private readonly IRepository _repository;

    public GetProfilePhotosHandler(IRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<ResponseResult<ProfilePhotoDto[]>> Handle(
        GetProfilePhotosQuery request, CancellationToken cancellationToken)
    {
        var profile = await _repository.GetAsync<Profile>(i => i.UserId == request.UserId);
        
        if (profile == null)
            return ResponseResult<ProfilePhotoDto[]>.CreateError("Could not find the specified user profile");

        var profilePhotos = profile.Photos.Select(i => new ProfilePhotoDto
        {
            PhotoId = i.PhotoId,
            PhotoUrl = i.Photo?.Url,
            IsMainPhoto = i.IsMainPhoto
        }).ToArray();
        
        return ResponseResult<ProfilePhotoDto[]>.CreateSuccess(profilePhotos);
    }
}