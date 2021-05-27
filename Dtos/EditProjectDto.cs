using System.ComponentModel.DataAnnotations;
namespace IssueTracker.Dtos
{
    public class EditProjectDto
    {
        [Required]
        public string Projectsname { get; set; }

        [Required]
        public string description { get; set; }

        public EditProjectDto(string Projectsname, string description)
        {
            this.Projectsname = Projectsname;
            this.description = description;
        }
    }
}
