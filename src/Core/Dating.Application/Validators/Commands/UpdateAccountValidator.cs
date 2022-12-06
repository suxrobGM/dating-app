namespace Dating.Application.Validators.Commands;

public class UpdateAccountValidator : AbstractValidator<UpdateAccountCommand>
{
    public UpdateAccountValidator()
    {
        const string passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@^!%*?&#])(?=.{8,})";

        RuleFor(i => i.Id).NotEmpty();
        RuleFor(i => i.Email).EmailAddress();
        
        RuleFor(i => i.OldPassword)
            .NotEmpty()
            .Matches(passwordPattern)
            .When(i => !string.IsNullOrWhiteSpace(i.NewPassword));
        
        RuleFor(i => i.NewPassword).Matches(passwordPattern);
    }
}