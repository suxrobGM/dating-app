using Dating.Infrastructure.EF.Helpers;
using Dating.Infrastructure.EF.Interceptors;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Dating.Infrastructure.EF.Data;

public class DatabaseContext : IdentityDbContext<User, AppRole, string>
{
    private readonly string _connectionString;
    private readonly IMediator? _mediator;
    private readonly AuditableEntitySaveChangesInterceptor? _saveChangesInterceptor;

    public DatabaseContext(
        DatabaseContextOptions options,
        AuditableEntitySaveChangesInterceptor? saveChangesInterceptor = null,
        IMediator? mediator = null)
    {
        _connectionString = options.ConnectionString ?? ConnectionStrings.LocalDB;
        _saveChangesInterceptor = saveChangesInterceptor;
        _mediator = mediator;
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new())
    {
        if (_mediator != null)
        {
            await _mediator.DispatchDomainEvents(this);
        }

        return await base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        if (_saveChangesInterceptor != null)
        {
            options.AddInterceptors(_saveChangesInterceptor);
        }

        if (!options.IsConfigured)
        {
            DbContextHelpers.ConfigureSqlServer(_connectionString, options);
        }
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AppRole>().ToTable("roles");
        builder.Entity<IdentityRoleClaim<string>>().ToTable("role_claims");
        builder.Entity<IdentityUserRole<string>>().ToTable("user_roles");
        builder.Entity<IdentityUserLogin<string>>().ToTable("user_logins");
        builder.Entity<IdentityUserClaim<string>>().ToTable("user_claims");
        builder.Entity<IdentityUserToken<string>>().ToTable("user_tokens");

        builder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            
            entity.HasMany(m => m.Interests)
                .WithMany(m => m.Users)
                .UsingEntity(e =>
                {
                    e.ToTable("user_interests");
                });
        });

        builder.Entity<Message>(entity =>
        {
            entity.ToTable("messages");

            entity.HasOne(m => m.Sender)
                .WithMany(m => m.SentMessages)
                .HasForeignKey(m => m.SenderId);

            entity.HasOne(m => m.Receiver)
                .WithMany(m => m.ReceivedMessages)
                .HasForeignKey(m => m.ReceiverId);
        });

        builder.Entity<Profile>(entity =>
        {
            entity.ToTable("profiles");
            
            entity.HasOne(m => m.MainPhoto)
                .WithOne()
                .HasForeignKey<Profile>(m => m.MainPhotoId);
            
            entity.HasOne(m => m.User)
                .WithOne(m => m.Profile)
                .HasForeignKey<Profile>(m => m.UserId);
        });

        builder.Entity<ProfilePhoto>(entity =>
        {
            entity.ToTable("profile_photos");

            entity.HasOne(m => m.Profile)
                .WithMany(m => m.Photos)
                .HasForeignKey(m => m.ProfileId);

            entity.HasOne(m => m.Photo)
                .WithOne()
                .HasForeignKey<ProfilePhoto>(m => m.PhotoId);
        });

        builder.Entity<Like>(entity =>
        {
            entity.ToTable("likes");

            entity.HasOne(m => m.TargetUser)
                .WithMany(m => m.ReceivedLikes)
                .HasForeignKey(m => m.TargetUserId);

            entity.HasMany(m => m.Users)
                .WithMany(m => m.LikedUsers)
                .UsingEntity(e =>
                {
                    e.ToTable("user_likes");
                });
        });

        builder.Entity<Interest>(entity =>
        {
            entity.ToTable("interests");
        });
        
        builder.Entity<Media>(entity =>
        {
            entity.ToTable("media");
        });
    }
}