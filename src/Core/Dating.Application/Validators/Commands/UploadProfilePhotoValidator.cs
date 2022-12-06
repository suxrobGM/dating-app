namespace Dating.Application.Validators.Commands;

public class UploadProfilePhotoValidator : AbstractValidator<UploadProfilePhotoCommand>
{
    public UploadProfilePhotoValidator()
    {
        RuleFor(i => i.UserId).NotEmpty();
        RuleFor(i => i.PhotoUrl).NotEmpty();
    }
}