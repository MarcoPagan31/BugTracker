using System;
namespace IssueTracker.Dtos
{
    public class CommentDto
    {
        public string comment { get; set; }
        public string tickettitle { get; set; }

        public CommentDto(string tickettitle, string comment)
        {
            this.tickettitle = tickettitle;
            this.comment = comment;
        }
    }
}
