using System;
using System.Linq;
using System.Reflection;
using IssueTracker.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace IssueTracker.Data
{
    public class UsersContext : IdentityDbContext<ApplicationUser>
    {
        public UsersContext()
        {
        }

        public UsersContext(DbContextOptions<UsersContext> opt) : base(opt)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            builder.Entity<Tickets>().Property(p => p.CreatedDate).HasDefaultValueSql("GETDATE()");
            builder.Entity<Tickets>().HasKey(p => p.Id);
            builder.Entity<Projects>().HasKey(p => p.Id);
            builder.Entity<Notification>().Property(p => p.CreatedDate).HasDefaultValueSql("GETDATE()");
        
        }
        
 
        public override int SaveChanges()
        {
            var modifiedEntities = ChangeTracker.Entries<Tickets>().Where(p => p.State == EntityState.Modified).ToList();
            var now = DateTime.UtcNow;

            foreach (var entity in modifiedEntities)
            {
                foreach (var prop in entity.OriginalValues.Properties)
                {
                    var originalValue = entity.OriginalValues[prop]?.ToString();
                    var currentValue = entity.CurrentValues[prop]?.ToString();
                    var title = entity.CurrentValues["title"]?.ToString();

                    if (originalValue != currentValue)
                    {
                        ChangeLog log = new ChangeLog()
                        {
                            PropertyName = prop.ToString(),
                            OldValue = originalValue,
                            NewValue = currentValue,
                            DateChanged = now,
                            Title = title
                        };
                        ChangeLog.Add(log);
                    }
                }
            }
            return base.SaveChanges();
        }

        public DbSet<ApplicationUser> ApplicationUser { get; set; }
        public DbSet<Projects> Projects { get; set; }
        public DbSet<Tickets> Tickets { get; set; }
        public DbSet<IdentityRole> IdentityRole { get; set; }
        public DbSet<ChangeLog> ChangeLog { get; set; }
        public DbSet<ForgotPassword> ForgotPassword { get; set; }
        public DbSet<ResetPassword> ResetPassword { get; set; }
        public DbSet<Notification> Notification { get; set; }
    }

}
