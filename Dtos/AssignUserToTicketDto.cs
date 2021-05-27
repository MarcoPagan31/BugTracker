using System;
using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class AssignUserToTicketDto
    {
        [Required]
        public string ApplicationUserusername { get; set; }

        [Required]
        public string title { get; set; }

        [Required]
        public string TicketsId { get; set; }

        [Required]
        public string ApplicationUserId { get; set; }

        public AssignUserToTicketDto(string ApplicationUserusername, string title, string TicketsId, string ApplicationUserId)
        {
            this.ApplicationUserusername = ApplicationUserusername;
            this.title = title;
            this.TicketsId = TicketsId;
            this.ApplicationUserId = ApplicationUserId;
        }
    }
}
