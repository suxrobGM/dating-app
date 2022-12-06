namespace Dating.Application.Validators.Queries;

public class GetUserInterestsValidator : AbstractValidator<GetUserInterestsQuery>
{
    public GetUserInterestsValidator()
    {
        RuleFor(i => i.UserId).NotEmpty();
    }
}