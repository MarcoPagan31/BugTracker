using System.Collections.Generic;
using IssueTracker.Models;

namespace IssueTracker.Data
{
    public interface IIssueTrackerRepo
    {
        bool SaveChanges();
        IEnumerable<ApplicationUser> GetAllUsers();
        IEnumerable<Projects> GetAllProjects();
        IEnumerable<Tickets> GetAllTickets();
        ApplicationUser GetUserByName(string ApplicationUserusername);
        ApplicationUser GetUserByLoginInfo(string username, string password);
        IEnumerable<ApplicationUser> GetUsersByProjectId(string ProjectsId);
        IEnumerable<ApplicationUser> GetUsersByTicketId(string TicketsId);
        IEnumerable<Projects> GetProjectsByUserId(string ApplicationUserId);
        IEnumerable<Tickets> GetTicketsByProjectId(string ProjectsId);
        IEnumerable<Tickets> GetTicketsByUserId(string ApplicationUserId);
        IEnumerable<Notification> GetNotificationsByUserId(string ApplicationUserId);
        Projects GetProjectByName(string Projectsname);
        Tickets GetTicketByTitle(string title);
        void CreateUser(ApplicationUser user);
        void CreateProject(Projects project);
        void CreateTicket(Tickets ticket);
        void CreateNotification(Notification notification);
        void DeleteProject(Projects project);
        IEnumerable<ChangeLog> GetLogsByTicketTitle(string title);
    }
}
