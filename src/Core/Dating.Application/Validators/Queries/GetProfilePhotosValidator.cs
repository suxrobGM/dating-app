namespace Dating.Application.Validators.Queries;

public class GetProfilePhotosValidator : AbstractValidator<GetProfilePhotosQuery>
{
    public GetProfilePhotosValidator()
    {
        RuleFor(i => i.UserId).NotEmpty();
    }
}