using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class LoginDto
    {
        [Required]
        public string username { get; set; }

        [Required]
        public string password { get; set; }


        public LoginDto()
        {

        }

        public LoginDto(string username, string password)
        {
            this.username = username;
            this.password = password;
        }
    }
}
