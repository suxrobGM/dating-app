namespace Dating.Application.Validators.Commands;

public class CreateAccountValidator : AbstractValidator<CreateAccountCommand>
{
    public CreateAccountValidator()
    {
        const string passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@^!%*?&#])(?=.{8,})";
        
        RuleFor(i => i.Email).NotEmpty().EmailAddress();
        RuleFor(i => i.Password).NotEmpty().Matches(passwordPattern);
        RuleFor(i => i.FirstName).NotEmpty().Length(2, 64);
        RuleFor(i => i.LastName).NotEmpty().Length(2, 64);
        RuleFor(i => i.LivingCity).NotEmpty().Length(2, 64);
        RuleFor(i => i.MainPhotoUrl).NotEmpty();
    }
}