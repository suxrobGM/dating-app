namespace Dating.Application.Validators.Queries;

internal class UserExistsValidator : AbstractValidator<UserExistsQuery>
{
    public UserExistsValidator()
    {
        RuleFor(i => i.Email).EmailAddress();
    }
}