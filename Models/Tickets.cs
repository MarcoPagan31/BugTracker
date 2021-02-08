using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace IssueTracker.Models
{
    public class Tickets
    {
        [Key]
        [Required]
        public string title { get; set; }
        
        [Required]
        public string submitter { get; set; }

        [Required]
        public string developer { get; set; }

        [Required]
        public string status { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? created { get; set; }

        public string? Projectsname { get; set; }

        [ForeignKey("Projectsname")]
        public virtual Projects Projects { get; set; }

        public Tickets(string title, string submitter, string developer, string status, DateTime created, string Projectsname)
        {
            this.title = title;
            this.submitter = submitter;
            this.developer = developer;
            this.status = status;
            this.created = created;
            this.Projectsname = Projectsname;

        }

        public Tickets()
        {
            
        }
    }
}
