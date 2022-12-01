namespace Dating.Application.Contracts.Models;

public record InterestDto(string Id, string Name)
{
    public string Id { get; set; } = Id;
    public string Name { get; set; } = Name;
}