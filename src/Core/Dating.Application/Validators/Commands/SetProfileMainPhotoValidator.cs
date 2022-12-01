namespace Dating.Application.Validators.Commands;

internal class SetProfileMainPhotoValidator : AbstractValidator<SetProfileMainPhotoCommand>
{
    public SetProfileMainPhotoValidator()
    {
        RuleFor(i => i.UserId).NotEmpty();
        RuleFor(i => i.PhotoId).NotEmpty();
    }
}