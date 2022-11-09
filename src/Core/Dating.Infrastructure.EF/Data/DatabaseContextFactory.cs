using Microsoft.EntityFrameworkCore.Design;

namespace Dating.Infrastructure.EF.Data;

public class DatabaseContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
{
    public DatabaseContext CreateDbContext(string[] args)
    {
        return new DatabaseContext(new DatabaseContextOptions());
    }
}