namespace Dating.Domain.Entities;

public class Interest : AuditableEntity
{
    public string? Name { get; set; }
    public virtual List<User> Users { get; set; } = new();
}