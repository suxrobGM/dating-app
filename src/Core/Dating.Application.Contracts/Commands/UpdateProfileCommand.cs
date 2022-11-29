namespace Dating.Application.Contracts.Commands;

public class UpdateProfileCommand : RequestBase
{
    public UpdateProfileCommand(string id)
    {
        Id = id;
    }
    
    public string Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? LivingCity { get; set; }
    public string? School { get; set; }
    public string? JobTitle { get; set; }
    public string? Company { get; set; }
    public string? Bio { get; set; }
    public Gender? Gender { get; set; }
    public SexualOrientation? Orientation { get; set; }
    public DateTime? Birthdate { get; set; }
}