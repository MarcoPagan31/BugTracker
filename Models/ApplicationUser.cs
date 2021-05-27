using System;
using System.Collections.Generic;
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

        public string ProjectsId { get; set; }

        [ForeignKey("ProjectsId")]
        public virtual Projects Projects { get; set; }

        public string TicketsId { get; set; }

        [ForeignKey("TicketsId")]
        public virtual Tickets Tickets { get; set; }

        public string role { get; set; }

        public string oldUsername { get; set; }

        public string filePath { get; set; }

        public ApplicationUser(string ApplicationUserusername, string password, string role, string ProjectsId, string TicketsId, string oldUsername, string filePath)
        {
            this.ApplicationUserusername = ApplicationUserusername;
            this.role = role;
            this.password = password;
            this.ProjectsId = ProjectsId;
            this.oldUsername = oldUsername;
            this.TicketsId = TicketsId;
            this.filePath = filePath;
        }
    }
}
  