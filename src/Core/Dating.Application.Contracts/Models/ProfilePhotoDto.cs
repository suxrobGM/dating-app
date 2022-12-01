namespace Dating.Application.Contracts.Models;

public record ProfilePhotoDto
{
    public string? PhotoId { get; set; }
    public string? PhotoUrl { get; set; }
    public bool? IsMainPhoto { get; set; }
}