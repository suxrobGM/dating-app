using Dating.DbMigrator.Models;
using Dating.Domain.Entities;
using Dating.Domain.Shared.Enums;
using Dating.Infrastructure.EF.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Dating.DbMigrator.Services;

internal class SeedDataService : BackgroundService
{
    private DatabaseContext _databaseContext = null!;
    private RoleManager<AppRole> _roleManager = null!;
    private UserManager<User> _userManager = null!;
    private readonly IConfiguration _configuration;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<SeedDataService> _logger;

    public SeedDataService(
        IConfiguration configuration,
        IServiceScopeFactory scopeFactory,
        ILogger<SeedDataService> logger)
    {
        _configuration = configuration;
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        try
        {
            _logger.LogInformation("Initializing database...");
            
            using var scope = _scopeFactory.CreateScope();
            _databaseContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
            _roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
            _userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

            await MigrateDatabaseAsync();
            _logger.LogInformation("Successfully initialized the database");

            _logger.LogInformation("Seeding data...");
            await AddAppRolesAsync();
            await AddSuperAdminAsync();
            await AddInterests();
            _logger.LogInformation("Successfully seeded databases");
            _logger.LogInformation("Finished all operations!");
        }
        catch (Exception ex)
        {
            _logger.LogError("Thrown exception in SeedData.ExecuteAsync(): {Exception}", ex);
        }
    }

    private async Task MigrateDatabaseAsync()
    {
        await _databaseContext.Database.MigrateAsync();
    }

    private async Task AddAppRolesAsync()
    {
        var appRoles = AppRoles.GetValues();

        foreach (var appRole in appRoles)
        {
            var role = new AppRole(appRole.Value)
            {
                DisplayName = appRole.DisplayName
            };

            var roleExists = await _roleManager.RoleExistsAsync(role.Name!);
            if (roleExists)
                continue;
            
            var result = await _roleManager.CreateAsync(role);

            if (result.Succeeded)
                _logger.LogInformation("Added the '{RoleName}' role", appRole.Value);
        }
    }

    private async Task AddSuperAdminAsync()
    {
        var userData = _configuration.GetSection("SuperAdmin").Get<UserDto>()!;
        var superAdmin = await _userManager.FindByEmailAsync(userData.Email!);
        
        if (superAdmin is null)
        {
            superAdmin = new User(userData.Email!)
            {
                FirstName = userData.FirstName,
                LastName = userData.LastName,
                EmailConfirmed = true,
                Profile = new Profile
                {
                    IsVerified = true
                }
            };

            var result = await _userManager.CreateAsync(superAdmin, userData.Password!);
            if (!result.Succeeded)
                throw new Exception(result.Errors.First().Description);

            _logger.LogInformation("Created the super admin '{Admin}'", superAdmin.UserName);
        }

        var hasSuperAdminRole = await _userManager.IsInRoleAsync(superAdmin, AppRoles.SuperAdmin);
        
        if (!hasSuperAdminRole)
        {
            await _userManager.AddToRoleAsync(superAdmin, AppRoles.SuperAdmin);
            _logger.LogInformation("Added 'app.super_admin' role to the user '{Admin}'", superAdmin.UserName);
        }
    }

    private async Task AddInterests()
    {
        var interests = _configuration.GetSection("Interests").Get<string[]>();

        if (interests == null)
            return;
        
        _logger.LogInformation("Adding user interests");
        foreach (var interest in interests)
        {
            _databaseContext.Set<Interest>().Add(new Interest(interest));
            _logger.LogInformation("Added {Interest}", interest);
        }

        await _databaseContext.SaveChangesAsync();
    }
}