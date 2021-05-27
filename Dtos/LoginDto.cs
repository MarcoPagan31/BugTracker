using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class LoginDto
    {
        [Required]
        public string ApplicationUserusername { get; set; }

        [Required]
        public string password { get; set; }


        public LoginDto()
        {

        }

        public LoginDto(string ApplicationUserusername, string password)
        {
            this.ApplicationUserusername = ApplicationUserusername;
            this.password = password;
        }
    }
}
