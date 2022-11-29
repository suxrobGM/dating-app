namespace Dating.Application.Validators.Commands;

internal class UpdateProfileValidator : AbstractValidator<UpdateProfileCommand>
{
    public UpdateProfileValidator()
    {
        RuleFor(i => i.Id).NotEmpty();
        RuleFor(i => i.FirstName).Length(2, 64);
        RuleFor(i => i.LastName).Length(2, 64);
        RuleFor(i => i.LivingCity).Length(2, 64);
        RuleFor(i => i.School).Length(2, 64);
        RuleFor(i => i.JobTitle).Length(2, 64);
        RuleFor(i => i.Company).Length(2, 64);
        RuleFor(i => i.Bio).MaximumLength(350);
    }
}