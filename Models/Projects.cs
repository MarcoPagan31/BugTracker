using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace IssueTracker.Models
{
    public class Projects
    {
        public Projects(string Projectsname, string description, string password)
        {
            this.Projectsname = Projectsname;
            this.description = description;
            this.password = password;
        }

        public Projects()
        {

        }

        [Key]
        [Required]
        public string Projectsname { get; set; }

        [Required]
        public string description { get; set; }

        public string ApplicationUserusername { get; set; }

        [ForeignKey("ApplicationUserusername")]
        public virtual ApplicationUser ApplicationUser { get; set; }

        public string password { get; set; }
    }
}
