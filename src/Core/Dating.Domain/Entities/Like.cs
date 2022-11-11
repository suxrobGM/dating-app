namespace Dating.Domain.Entities;

public class Like : AuditableEntity
{
    public virtual string? TargetUserId { get; set; }
    
    /// <summary>
    /// The target user who belongs this like.
    /// </summary>
    public virtual User? TargetUser { get; set; }
    
    /// <summary>
    /// Users who put like to the target user.
    /// </summary>
    public virtual List<User> Users { get; set; } = new();
}