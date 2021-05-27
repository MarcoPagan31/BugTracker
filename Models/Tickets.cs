using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace IssueTracker.Models
{
    public class Tickets
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        [Required]
        public string title { get; set; }
        
        [Required]
        public string submitter { get; set; }

        [Required]
        public string developer { get; set; }

        [Required]
        public string priority { get; set; }

        [Required]
        public string type { get; set; }

        [Required]
        public string status { get; set; }

        public string comment { get; set; }

        public string oldTitle { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? CreatedDate { get; set; }

        public string? ProjectsId { get; set; }

        [ForeignKey("ProjectsId")]
        public virtual Projects Projects { get; set; }

        public string? ApplicationUserId { get; set; }

        public string filePath { get; set; }

        [ForeignKey("ApplicationUserId")]
        public virtual ApplicationUser ApplicationUser { get; set; }

        public string ApplicationUserusername { get; set; }

        public Tickets(string title, string submitter, string developer, string status, DateTime CreatedDate, string ProjectsId, string comment, string priority, string type, string ApplicationUserId, string oldTitle, string filePath, string ApplicationUserusername)
        {
            this.title = title;
            this.submitter = submitter;
            this.developer = developer;
            this.status = status;
            this.CreatedDate = CreatedDate;
            this.ProjectsId = ProjectsId;
            this.comment = comment;
            this.priority = priority;
            this.type = type;
            this.ApplicationUserId = ApplicationUserId;
            this.oldTitle = oldTitle;
            this.filePath = filePath;
            this.ApplicationUserusername = ApplicationUserusername;
        }

        public Tickets()
        {
            
        }
    }
}
