using Dating.Domain.Entities;
using Dating.Domain.Shared.Enums;
using Dating.Infrastructure.EF.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Dating.DbMigrator.Services;

internal class SeedDataService : BackgroundService
{
    private readonly ILogger<SeedDataService> _logger;
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public SeedDataService(
        ILogger<SeedDataService> logger,
        IServiceScopeFactory serviceScopeFactory)
    {
        _logger = logger;
        _serviceScopeFactory = serviceScopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        try
        {
            using var scope = _serviceScopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

            _logger.LogInformation("Initializing database...");
            await MigrateDatabaseAsync(dbContext);
            _logger.LogInformation("Successfully initialized the database");

            _logger.LogInformation("Seeding data...");
            await AddAppRolesAsync(scope.ServiceProvider);
            await AddSuperAdminAsync(scope.ServiceProvider);
            _logger.LogInformation("Successfully seeded databases");

            // var populateTestData = new PopulateTestData(_logger, scope.ServiceProvider);
            // await populateTestData.ExecuteAsync();
            _logger.LogInformation("Finished all operations!");
        }
        catch (Exception ex)
        {
            _logger.LogError("Thrown exception in SeedData.ExecuteAsync(): {Exception}", ex);
        }
    }

    private async Task MigrateDatabaseAsync(DbContext databaseContext)
    {
        await databaseContext.Database.MigrateAsync();
    }

    private async Task AddAppRolesAsync(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<AppRole>>();
        var appRoles = AppRoles.GetValues();

        foreach (var appRole in appRoles)
        {
            var role = new AppRole(appRole.Value)
            {
                DisplayName = appRole.DisplayName
            };

            var roleExists = await roleManager.RoleExistsAsync(role.Name!);
            if (roleExists)
                continue;
            
            var result = await roleManager.CreateAsync(role);

            if (result.Succeeded)
                _logger.LogInformation("Added the '{RoleName}' role", appRole.Value);
        }
    }

    private async Task AddSuperAdminAsync(IServiceProvider serviceProvider)
    {
        var configuration = serviceProvider.GetRequiredService<IConfiguration>();
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        var userData = configuration.GetSection("SuperAdmin").Get<UserDto>()!;
        var superAdmin = await userManager.FindByEmailAsync(userData.Email!);
        
        if (superAdmin is null)
        {
            superAdmin = new User
            {
                UserName = userData.UserName,
                Email = userData.Email,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(superAdmin, userData.Password!);
            if (!result.Succeeded)
                throw new Exception(result.Errors.First().Description);

            _logger.LogInformation("Created the super admin '{Admin}'", superAdmin.UserName);
        }

        var hasSuperAdminRole = await userManager.IsInRoleAsync(superAdmin, AppRoles.SuperAdmin);
        
        if (!hasSuperAdminRole)
        {
            await userManager.AddToRoleAsync(superAdmin, AppRoles.SuperAdmin);
            _logger.LogInformation("Added 'app.super_admin' role to the user '{Admin}'", superAdmin.UserName);
        }
    }
}