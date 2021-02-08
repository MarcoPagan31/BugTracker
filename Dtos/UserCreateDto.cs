using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class UserCreateDto
    {
        [Required]
        public string username { get; set; }

        [Required]
        public string password { get; set; }

        [Required]
        public string email { get; set; }

        [Required]
        public string role { get; set; }

        public UserCreateDto(string username, string password, string email, string role)
        {
            this.username = username;
            this.password = password;
            this.email = email;
            this.role = role;
        }
    }
}
