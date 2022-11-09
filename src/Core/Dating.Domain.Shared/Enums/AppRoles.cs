namespace Dating.Domain.Shared.Enums;

public static class AppRoles
{
    public const string SuperAdmin = "app.superadmin";
    public const string Admin = "app.admin";
    public const string Manager = "app.manager";
    public const string Moderator = "app.moderator";

    public static IEnumerable<EnumType> GetValues()
    {
        yield return new EnumType(SuperAdmin, "Super Admin");
        yield return new EnumType(Admin, "Admin");
        yield return new EnumType(Manager, "Manager");
        yield return new EnumType(Moderator, "Moderator");
    }
}