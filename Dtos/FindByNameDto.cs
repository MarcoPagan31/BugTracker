using System;
using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class FindByNameDto
    {
        [Required]
        public string ApplicationUserusername { get; set; }

        public FindByNameDto(string ApplicationUserusername)
        {
            this.ApplicationUserusername = ApplicationUserusername;
        }
    }
}
