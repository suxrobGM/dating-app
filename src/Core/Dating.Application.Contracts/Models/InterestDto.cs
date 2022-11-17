namespace Dating.Application.Contracts.Models;

public class InterestDto
{
    public InterestDto(string name)
    {
        Name = name;
    }
    
    public string Name { get; set; }
}