namespace Dating.Domain.Entities;

public class Profile : AuditableEntity
{
    public string? UserId { get; set; }
    public SexualOrientation Orientation { get; set; }
    public string? Bio { get; set; }
    public string? School { get; set; }
    public string? JobTitle { get; set; }
    public string? Company { get; set; }
    public string? LivingCity { get; set; }
    public bool IsVerified { get; set; }
    
    public virtual User? User { get; set; }
    public virtual List<ProfilePhoto> Photos { get; set; } = new();

    public void SetMainPhoto(ProfilePhoto photo)
    {
        foreach (var profilePhoto in Photos)
        {
            profilePhoto.IsMainPhoto = false;
        }

        photo.IsMainPhoto = true;        
        Photos.Add(photo);
    }
}