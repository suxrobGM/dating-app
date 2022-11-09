namespace Dating.DbMigrator.Services;

internal class PopulateFakeData
{
    
}

internal record UserDto
{
    public string? UserName { get; init; }
    public string? Email { get; init; }
    public string? Password { get; init; }
}