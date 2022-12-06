namespace Dating.Application.Validators.Commands;

public class SetProfileMainPhotoValidator : AbstractValidator<SetProfileMainPhotoCommand>
{
    public SetProfileMainPhotoValidator()
    {
        RuleFor(i => i.UserId).NotEmpty();
        RuleFor(i => i.PhotoId).NotEmpty();
    }
}