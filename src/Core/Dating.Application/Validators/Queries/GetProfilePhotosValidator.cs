namespace Dating.Application.Validators.Queries;

internal class GetUserInterestsValidator : AbstractValidator<GetUserInterestsQuery>
{
    public GetUserInterestsValidator()
    {
        RuleFor(i => i.UserId).NotEmpty();
    }
}