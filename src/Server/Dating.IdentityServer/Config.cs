using Dating.IdentityServer.Claims;
using Duende.IdentityServer.Models;

namespace Dating.IdentityServer;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources()
    {
        return new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new()
            {
                Name = "roles",
                DisplayName = "Identity roles",
                UserClaims = {
                    CustomClaimTypes.Role,
                }
            }
        };
    }
    
    public static IEnumerable<ApiScope> ApiScopes()
    {
        return new ApiScope[]
        {
            new()
            {
                Name = "dating.api.admin",
                DisplayName = "Dating Admin API",
                UserClaims = {
                    CustomClaimTypes.Role, 
                    CustomClaimTypes.Permission
                }
            },
            new()
            {
                Name = "dating.api.client",
                DisplayName = "Dating Client API",
                UserClaims = {
                    CustomClaimTypes.Role, 
                    CustomClaimTypes.Permission
                }
            }
        };
    }
    
    public static IEnumerable<ApiResource> ApiResources()
    {
        return new ApiResource[]
        {
            new()
            {
                Name = "dating.api",
                DisplayName = "Dating API",
                Scopes = {
                    "dating.api.client",
                    "dating.api.client"
                },
                UserClaims = {
                    CustomClaimTypes.Role, 
                    CustomClaimTypes.Permission
                }
            }
        };
    }

    public static IEnumerable<Client> Clients(IConfiguration configuration)
    {
        //var a = "Super secret key 1".Sha256();
        //var b = "Super secret key 2".Sha256();
        return configuration.GetSection("IdentityServer:Clients").Get<Client[]>()!;
    }
}