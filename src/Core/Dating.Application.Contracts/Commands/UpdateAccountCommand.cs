namespace Dating.Application.Contracts.Commands;

public class UpdateAccountCommand : RequestBase
{
    public UpdateAccountCommand(string id)
    {
        Id = id;
    }
    
    public string Id { get; set; }
    public string? Email { get; set; }
    public string? OldPassword { get; set; }
    public string? NewPassword { get; set; }
}