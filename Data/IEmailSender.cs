using System;
using System.Threading.Tasks;
using IssueTracker.Models;

namespace IssueTracker.Data
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
        Task SendEmailAsync(Message message);
    }
}
