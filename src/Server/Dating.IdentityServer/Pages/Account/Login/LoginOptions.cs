namespace Dating.IdentityServer.Pages.Login;

public static class LoginOptions
{
    public const bool AllowLocalLogin = true;
    public const bool AllowRememberLogin = true;
    public static TimeSpan RememberMeLoginDuration = TimeSpan.FromDays(30);
    public const string InvalidCredentialsErrorMessage = "Invalid email or password";
}