namespace Dating.Application.Validators.Commands;

internal class CreateAccountValidator : AbstractValidator<CreateAccountCommand>
{
    public CreateAccountValidator()
    {
        RuleFor(i => i.Email).EmailAddress();
        RuleFor(i => i.Password).NotEmpty().MinimumLength(8);
        RuleFor(i => i.FirstName).NotEmpty().Length(2, 32);
        RuleFor(i => i.LastName).NotEmpty().Length(2, 32);
        RuleFor(i => i.LivingCity).NotEmpty().Length(2, 32);
        RuleFor(i => i.Interests).NotNull().Must(i => i is { Length: > 0 and < 6 });
    }
}