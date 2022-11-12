namespace Dating.Domain.Entities;

public class Interest : AuditableEntity
{
    public Interest(string name)
    {
        Name = name;
        NormalizedName = Name.ToUpper();
    }
    
    public string Name { get; set; }
    public string NormalizedName { get; set; }
    public virtual List<User> Users { get; set; } = new();
}