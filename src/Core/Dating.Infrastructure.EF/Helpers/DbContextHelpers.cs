using Microsoft.EntityFrameworkCore;

namespace Dating.Infrastructure.EF.Helpers;

internal static class DbContextHelpers
{
    public static void ConfigureMySql(string connectionString, DbContextOptionsBuilder options)
    {
        options.UseMySql(connectionString,
                ServerVersion.AutoDetect(connectionString),
                o =>
                {
                    o.EnableRetryOnFailure(8, TimeSpan.FromSeconds(15), null);
                    o.EnableStringComparisonTranslations();
                    o.MigrationsAssembly("Dating.Infrastructure.EF.Migrations");
                })
            .UseLazyLoadingProxies();
    }

    public static void ConfigureSqlServer(string connectionString, DbContextOptionsBuilder options)
    {
        options.UseSqlServer(connectionString, sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(8, TimeSpan.FromSeconds(15), null);
            // sqlOptions.MigrationsAssembly("Dating.Infrastructure.EF.Migrations");
        });

        options.UseLazyLoadingProxies();
    }
}