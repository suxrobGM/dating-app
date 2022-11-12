using Dating.Infrastructure.EF.Builder;
using Dating.Infrastructure.EF.Data;
using Dating.Infrastructure.EF.Interceptors;
using Dating.Infrastructure.EF.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Dating.Infrastructure.EF;

public static class Registrar
{
    public static IInfrastructureBuilder AddInfrastructureLayer(
        this IServiceCollection services,
        IConfiguration configuration,
        string connectionStringSection = "LocalDB")
    {
        AddDatabase(services, configuration, connectionStringSection);
        var identityBuilder = AddIdentity(services);

        services.AddScoped<AuditableEntitySaveChangesInterceptor>();
        services.AddScoped<IUnitOfWork, UnitOfWork<DatabaseContext>>();
        services.AddScoped<IRepository, GenericRepository<DatabaseContext>>();
        return new InfrastructureBuilder(identityBuilder);
    }
    
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
                "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789_.@";
            options.User.RequireUniqueEmail = true;
        })
        .AddRoles<AppRole>()
        .AddEntityFrameworkStores<DatabaseContext>();

        return identityBuilder;
    }
}