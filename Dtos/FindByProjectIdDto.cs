using System;
using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class FindByProjectIdDto
    {
        [Required]
        public string ProjectsId { get; set; }

        public FindByProjectIdDto(string ProjectsId)
        {
            this.ProjectsId = ProjectsId;
        }
    }
}
