namespace Dating.Application.Validators.Commands;

internal class DeleteProfilePhotoValidator : AbstractValidator<DeleteProfilePhotoCommand>
{
    public DeleteProfilePhotoValidator()
    {
        RuleFor(i => i.UserId).NotEmpty();
        RuleFor(i => i.PhotoId).NotEmpty();
    }
}