namespace Dating.Application.Validators.Commands;

internal class CreateAccountValidator : AbstractValidator<CreateAccountCommand>
{
    public CreateAccountValidator()
    {
        RuleFor(i => i.Email).NotEmpty().EmailAddress();
        RuleFor(i => i.Password).NotEmpty().MinimumLength(8);
        RuleFor(i => i.FirstName).NotEmpty().Length(2, 64);
        RuleFor(i => i.LastName).NotEmpty().Length(2, 64);
        RuleFor(i => i.LivingCity).NotEmpty().Length(2, 64);
        RuleFor(i => i.MainPhotoUrl).NotEmpty();
    }
}