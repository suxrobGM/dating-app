namespace Dating.Application.Validators.Queries;

internal class GetProfileValidator : AbstractValidator<GetProfileQuery>
{
    public GetProfileValidator()
    {
        RuleFor(i => i.Id).NotEmpty();
    }
}