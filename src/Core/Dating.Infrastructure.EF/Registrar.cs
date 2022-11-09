using Dating.Infrastructure.EF.Builder;
using Dating.Infrastructure.EF.Data;
using Dating.Infrastructure.EF.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Dating.Infrastructure.EF;

public static class Registrar
{
    private static void AddDatabase(
        IServiceCollection services,
        IConfiguration configuration,
        string connectionSection)
    {
        var connectionString = configuration.GetConnectionString(connectionSection);
        var options = new DatabaseContextOptions
        {
            ConnectionString = connectionString
        };
        
        services.AddSingleton(options);
        services.AddDbContext<DatabaseContext>();
    }

    private static IdentityBuilder AddIdentity(IServiceCollection services)
    {
        var identityBuilder = services.AddIdentityCore<User>(options =>
        {
            options.Password.RequiredLength = 8;
            options.Password.RequireUppercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.User.AllowedUserNameCharacters =
                "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789_.";
            options.User.RequireUniqueEmail = true;
        })
        .AddRoles<AppRole>()
        .AddEntityFrameworkStores<DatabaseContext>();

        return identityBuilder;
    }
    
    public static IInfrastructureBuilder AddInfrastructureLayer(
        this IServiceCollection services,
        IConfiguration configuration,
        string connectionStringSection = "LocalDB")
    {
        var identityBuilder = AddIdentity(services);
        AddDatabase(services, configuration, connectionStringSection);
        
        services.AddScoped<IRepository, GenericRepository<DatabaseContext>>();
        services.AddScoped<UnitOfWork<DatabaseContext>>();
        return new InfrastructureBuilder(identityBuilder);
    }
}