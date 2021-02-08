using System.Collections.Generic;
using IssueTracker.Models;

namespace IssueTracker.Data
{
    public interface IIssueTrackerRepo
    {
        bool SaveChanges();
        IEnumerable<ApplicationUser> GetAllUsers();
        IEnumerable<Projects> GetAllProjects();
        ApplicationUser GetUserByName(string ApplicationUserusername);
        ApplicationUser GetUserByLoginInfo(string username, string password);
        IEnumerable<ApplicationUser> GetUsersByProjectName(string Projectsname);
        IEnumerable<Projects> GetProjectsByUserName(string ApplicationUserusername);
        IEnumerable<Tickets> GetTicketsByProjectName(string Projectsname);
        Projects GetProjectByName(string name);
        void CreateUser(ApplicationUser cmd);
        void CreateProject(Projects project);
        void CreateTicket(Tickets ticket);
        //void UpdateCommand(Command cmd);
        //void DeleteCommand(Command cmd);
    }
}
