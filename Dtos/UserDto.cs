using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class UserDto
    {
        [Required]
        public string ApplicationUserusername { get; set; }

        public UserDto()
        {
        }

        public UserDto(string ApplicationUserusername)
        {
            this.ApplicationUserusername = ApplicationUserusername;
        }
    }
}
