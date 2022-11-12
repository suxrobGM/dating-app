using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Identity;

namespace Dating.Domain.Entities;

public class User : IdentityUser, IAggregateRoot
{
    [SuppressMessage("ReSharper", "VirtualMemberCallInConstructor")]
    public User(string email)
    {
        Email = email;
        UserName = email;
    }

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public Gender Gender { get; set; }
    public DateTime Birthdate { get; set; } = DateTime.Now;
    public DateTime RegistrationDate { get; set; } = DateTime.Now;
    
    public virtual Profile? Profile { get; set; }
    public virtual List<Interest> Interests { get; set; } = new();
    public virtual List<Message> ReceivedMessages { get; set; } = new();
    public virtual List<Message> SentMessages { get; set; } = new();
    public virtual List<Like> ReceivedLikes { get; set; } = new();
    public virtual List<Like> LikedUsers { get; set; } = new();
}