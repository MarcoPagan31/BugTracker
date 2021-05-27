using System;
using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Models
{
    public class ForgotPassword
    {
        [Key]
        [Required, EmailAddress]
        public string Email { get; set; }

        public bool EmailSent { get; set; }

        public ForgotPassword()
        {

        }
    }
}