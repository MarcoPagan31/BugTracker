using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace IssueTracker.Models
{
    public class Projects
    {
        public Projects(string ApplicationUserId, string Projectsname, string description, string password, string oldProjectsName, string ApplicationUserusername)
        {
            this.ApplicationUserId = ApplicationUserId;
            this.Projectsname = Projectsname;
            this.description = description;
            this.password = password;
            this.oldProjectsName = oldProjectsName;
            this.ApplicationUserusername = ApplicationUserusername;
        }

        public Projects()
        {

        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public string Id { get; set; }

        [Required]
        public string Projectsname { get; set; }

        [Required]
        public string description { get; set; }

        public string oldProjectsName { get; set; }

        public string ApplicationUserId { get; set; }

        [ForeignKey("ApplicationUserId")]
        public virtual ApplicationUser ApplicationUser { get; set; }

        public string ApplicationUserusername { get; set; }

        public string password { get; set; }
    }
}
