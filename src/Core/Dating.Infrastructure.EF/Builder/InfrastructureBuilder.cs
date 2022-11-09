using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Dating.Infrastructure.EF.Builder;

internal class InfrastructureBuilder : ServiceCollection, IInfrastructureBuilder
{
    private readonly IdentityBuilder _identityBuilder;
    
    internal InfrastructureBuilder(IdentityBuilder identityBuilder)
    {
        _identityBuilder = identityBuilder;
    }
    
    public IInfrastructureBuilder ConfigureIdentity(Action<IdentityBuilder> configure)
    {
        configure(_identityBuilder);
        return this;
    }

    public IInfrastructureBuilder ConfigureDatabase(Action<DatabaseContextOptions> configure)
    {
        var options = new DatabaseContextOptions();
        configure(options);

        var serviceDesc = new ServiceDescriptor(typeof(DatabaseContextOptions), options);

        if (Contains(serviceDesc))
        {
            Remove(serviceDesc);
        }
        
        this.AddSingleton(options);
        return this;
    }
}