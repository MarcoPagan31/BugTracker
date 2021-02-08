using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace IssueTracker.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
        }

        [Required]
        public string ApplicationUserusername { get; set; }

        [Required]
        public string password { get; set; }

        [Required]
        public string role { get; set; }

        public string Projectsname { get; set; }

        [ForeignKey("Projectsname")]
        public virtual Projects Projects { get; set; }

        public ApplicationUser(string ApplicationUserusername, string password, string role, string Projectsname)
        {
            this.ApplicationUserusername = ApplicationUserusername;
            this.role = role;
            this.password = password;
            this.Projectsname = Projectsname;
        }
    }
}
  