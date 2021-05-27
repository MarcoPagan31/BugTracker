using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IssueTracker.Models
{
    public class ChangeLog
    {
        public ChangeLog()
        {
        }

        public ChangeLog(string propertyName, string oldValue, string newValue, DateTime? dateChanged, string title)
        {
            PropertyName = propertyName;
            OldValue = oldValue;
            NewValue = newValue;
            DateChanged = dateChanged;
            Title = title;
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string PropertyName { get; set; }

        public string OldValue { get; set; }

        public string NewValue { get; set; }

        public DateTime? DateChanged { get; set; }

        public string Title { get; set; }


        
    }
}
