namespace Dating.Application.Contracts.Models;

public record ProfileDto
{
    public string? UserId { get; set; }
    public SexualOrientation Orientation { get; set; }
    public string? Bio { get; set; }
    public string? School { get; set; }
    public string? JobTitle { get; set; }
    public string? Company { get; set; }
    public string? LivingCity { get; set; }
    public bool IsVerified { get; set; }
    
    public virtual List<string> Photos { get; set; } = new();
}