using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Dating.IdentityServer.Services;

public class UserCustomClaimsFactory : UserClaimsPrincipalFactory<User, AppRole>
{
    private readonly RoleManager<AppRole> _roleManager;
    private readonly UserManager<User> _userManager;

    public UserCustomClaimsFactory(
        UserManager<User> userManager, 
        RoleManager<AppRole> roleManager, 
        IOptions<IdentityOptions> options) 
        : base(userManager, roleManager, options)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    protected override async Task<ClaimsIdentity> GenerateClaimsAsync(User user)
    {
        var claimsIdentity = await base.GenerateClaimsAsync(user);

        await AddAppRoleClaims(claimsIdentity, user);
        return claimsIdentity;
    }

    private async Task AddAppRoleClaims(ClaimsIdentity claimsIdentity, User user)
    {
        var appRoles = await _userManager.GetRolesAsync(user);

        foreach (var roleName in appRoles)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            
            if (role == null)
                continue;
            
            var claims = await _roleManager.GetClaimsAsync(role);
            claimsIdentity.AddClaims(claims);
        }
    }
}