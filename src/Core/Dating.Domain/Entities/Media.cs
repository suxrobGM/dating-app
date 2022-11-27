namespace Dating.Domain.Entities;

public class Media : AuditableEntity
{
    public Media(string url, string contentType)
    {
        Url = url;
        ContentType = contentType;
    }
    
    public string Url { get; set; }
    public string ContentType { get; set; }
}