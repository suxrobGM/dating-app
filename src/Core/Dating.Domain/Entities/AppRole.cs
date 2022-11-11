using Microsoft.AspNetCore.Identity;

namespace Dating.Domain.Entities;

public class AppRole : IdentityRole, IAggregateRoot
{
    public AppRole(string name): base(name)
    {
        if (!name.StartsWith("app."))
            base.Name = $"app.{name}";
        
        DisplayName = base.Name;
    }

    public string? DisplayName { get; set; }
}