namespace Dating.Domain.Entities;

public class Interest : Entity
{
    public string? Name { get; set; }
    public virtual List<User> Users { get; set; } = new();
}