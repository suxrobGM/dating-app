namespace Dating.Application.Contracts.Commands;

public class CreateAccountCommand : RequestBase
{
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? LivingCity { get; set; }
    public Gender Gender { get; set; }
    public SexualOrientation Orientation { get; set; }
    public DateTime Birthdate { get; set; }
    public string? MainPhotoUrl { get; set; }
}