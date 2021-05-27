using System;
namespace IssueTracker.Dtos
{
    public class FindByTitleDto
    {
        public string title { get; set; }

        public FindByTitleDto(string title)
        {
            this.title = title;
        }
    }
}
