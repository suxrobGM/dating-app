namespace Dating.Application.Validators.Queries;

public class UserExistsValidator : AbstractValidator<UserExistsQuery>
{
    public UserExistsValidator()
    {
        RuleFor(i => i.Email).EmailAddress();
    }
}