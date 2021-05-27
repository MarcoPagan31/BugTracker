using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class UserDto
    {
        [Required]
        public string ApplicationUserId { get; set; }

        public UserDto()
        {
        }

        public UserDto(string ApplicationUserId)
        {
            this.ApplicationUserId = ApplicationUserId;
        }
    }
}
