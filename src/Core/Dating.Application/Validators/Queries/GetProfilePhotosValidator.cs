namespace Dating.Application.Validators.Queries;

internal class GetProfilePhotosValidator : AbstractValidator<GetProfilePhotosQuery>
{
    public GetProfilePhotosValidator()
    {
        RuleFor(i => i.UserId).NotEmpty();
    }
}