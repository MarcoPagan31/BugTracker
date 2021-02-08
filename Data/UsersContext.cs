using IssueTracker.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace IssueTracker.Data
{
    public class UsersContext : IdentityDbContext<ApplicationUser>
    {

        public UsersContext(DbContextOptions<UsersContext> opt) : base(opt)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

        }


        public DbSet<ApplicationUser> ApplicationUser { get; set; }
        public DbSet<Projects> Projects { get; set; }
        public DbSet<Tickets> Tickets { get; set; }
    }

}
