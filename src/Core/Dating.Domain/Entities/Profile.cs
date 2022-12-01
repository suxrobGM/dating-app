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

    public ProfilePhoto AddPhoto(Media photo)
    {
        var profilePhoto = new ProfilePhoto { Photo = photo };
        Photos.Add(profilePhoto);
        return profilePhoto;
    }

    public void DeletePhoto(string photoId)
    {
        if (Photos.Count <= 1)
            return;
        
        var photo = Photos.FirstOrDefault(i => i.PhotoId == photoId);

        if (photo == null)
            return;

        if (photo.IsMainPhoto)
            SetMainPhoto(Photos.First());
        
        Photos.Remove(photo);
    }
    
    public ProfilePhoto? GetMainPhoto()
    {
        return Photos.FirstOrDefault(i => i.IsMainPhoto);
    }

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