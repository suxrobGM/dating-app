using Microsoft.AspNetCore.Identity;

namespace Dating.Domain.Entities;

public class AppRole : IdentityRole<string>, IAggregateRoot
{
    
}