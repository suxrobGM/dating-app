namespace Dating.Domain.Entities;

public class Media : AuditableEntity
{
    public string? Url { get; set; }
    public string? ContentType { get; set; }
}