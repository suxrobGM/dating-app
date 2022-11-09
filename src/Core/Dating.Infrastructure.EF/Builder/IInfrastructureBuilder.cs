using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Dating.Infrastructure.EF.Builder;

public interface IInfrastructureBuilder : IServiceCollection
{
    IInfrastructureBuilder ConfigureIdentity(Action<IdentityBuilder> configure);
    IInfrastructureBuilder ConfigureDatabase(Action<DatabaseContextOptions> configure);
}