namespace Dating.Application.Handlers.Commands;

internal class DeleteProfilePhotoHandler : IRequestHandler<DeleteProfilePhotoCommand, ResponseResult>
{
    private readonly IRepository _repository;

    public DeleteProfilePhotoHandler(IRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<ResponseResult> Handle(DeleteProfilePhotoCommand request, CancellationToken cancellationToken)
    {
        var profile = await _repository.GetAsync<Profile>(i => i.UserId == request.UserId);

        if (profile == null)
            return ResponseResult.CreateError("Could not find the specified user profile");
        
        profile.DeletePhoto(request.PhotoId!);
        await _repository.UnitOfWork.SaveChangesAsync();
        return ResponseResult.CreateSuccess();
    }
}