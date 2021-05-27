using System;
using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class LoginDemoDto
    {
        public LoginDemoDto()
        {
        }

        [Required]
        public string ApplicationUserusername { get; set; }

        [Required]
        public string email { get; set; }

        [Required]
        public string role { get; set; }

        [Required]
        public string password { get; set; }

        public LoginDemoDto(string ApplicationUserusername, string password, string email, string role)
        {
            this.ApplicationUserusername = ApplicationUserusername;
            this.password = password;
            this.role = role;
            this.email = email;
        }
    }
}
