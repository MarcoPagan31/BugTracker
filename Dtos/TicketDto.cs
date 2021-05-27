using System.ComponentModel.DataAnnotations;

namespace IssueTracker.Dtos
{
    public class TicketDto
    {
        [Required]
        public string TicketsId { get; set; }

        public TicketDto(string TicketsId)
        {
            this.TicketsId = TicketsId;
        }
    }
}
