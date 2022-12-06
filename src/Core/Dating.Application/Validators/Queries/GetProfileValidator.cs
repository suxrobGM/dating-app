namespace Dating.Application.Validators.Queries;

public class GetProfileValidator : AbstractValidator<GetProfileQuery>
{
    public GetProfileValidator()
    {
        RuleFor(i => i.Id).NotEmpty();
    }
}