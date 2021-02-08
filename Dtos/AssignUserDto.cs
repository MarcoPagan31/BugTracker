using System;
using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class AssignUserDto
    {
        [Required]
        public string ApplicationUserusername { get; set; }

        [Required]
        public string Projectsname { get; set; }

        public AssignUserDto(string ApplicationUserusername, string Projectsname)
        {
            this.ApplicationUserusername = ApplicationUserusername;
            this.Projectsname = Projectsname;
        }
    }
}
