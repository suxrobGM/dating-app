using Microsoft.EntityFrameworkCore;

namespace Dating.Infrastructure.EF.Helpers;

internal static class DbContextHelpers
{
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