using System;
using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class ProjectDto
    {
        [Required]
        public string Projectsname { get; set; }

        public ProjectDto(string Projectsname)
        {
            this.Projectsname = Projectsname;
        }
    }
}
