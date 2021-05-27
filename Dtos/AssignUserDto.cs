using System;
using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class AssignUserDto
    {
        [Required]
        public string ApplicationUserId { get; set; }

        [Required]
        public string ApplicationUserusername { get; set; }

        [Required]
        public string Projectsname { get; set; }

        [Required]
        public string Id { get; set; }

        public AssignUserDto(string ApplicationUserId, string ApplicationUserusername, string Projectsname, string Id)
        {
            this.ApplicationUserId = ApplicationUserId;
            this.ApplicationUserusername = ApplicationUserusername;
            this.Projectsname = Projectsname;
            this.Id = Id;
        }
    }
}
