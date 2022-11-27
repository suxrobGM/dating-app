namespace Dating.Domain.Entities;

public class ProfilePhoto : AuditableEntity
{
    public string? ProfileId { get; set; }
    public string? PhotoId { get; set; }
    public bool IsMainPhoto { get; set; }
    
    public virtual Profile? Profile { get; set; }
    public virtual Media? Photo { get; set; }
}