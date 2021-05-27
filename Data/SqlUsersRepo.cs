using System;
using System.Collections.Generic;
using System.Linq;
using IssueTracker.Models;

namespace IssueTracker.Data
{
    public class SqlUsersRepo : IIssueTrackerRepo
    {
        private readonly UsersContext _context;

        public SqlUsersRepo(UsersContext context)
        {
            _context = context;
        }

        public IEnumerable<ApplicationUser> GetAllUsers()
        {
            return _context.ApplicationUser.ToList();
        }

        public IEnumerable<Projects> GetAllProjects()
        {
            return _context.Projects.ToList();
        }

        public IEnumerable<Tickets> GetAllTickets()
        {
            return _context.Tickets.ToList();
        }

        public void CreateUser(ApplicationUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            
            _context.Users.Add(user);
        }

        public void CreateProject(Projects project)
        {
            if (project == null)
            {
                throw new ArgumentNullException(nameof(project));
            }

            _context.Projects.Add(project);
        }

        public void CreateTicket(Tickets ticket)
        {
            if (ticket == null)
            {
                throw new ArgumentNullException(nameof(ticket));
            }

            _context.Tickets.Add(ticket);
        }

        public void CreateNotification(Notification notification)
        {
            if (notification == null)
            {
                throw new ArgumentNullException(nameof(notification));
            }

            _context.Notification.Add(notification);
        }

        public void DeleteProject(Projects project)
        {
            if (project == null)
            {
                throw new ArgumentNullException(nameof(project));
            }

            _context.Projects.Remove(project);
        }
        
        public ApplicationUser GetUserByName(string ApplicationUserusername)
        {
            return _context.ApplicationUser.FirstOrDefault(user => user.ApplicationUserusername == ApplicationUserusername);
        }

        public IEnumerable<ApplicationUser> GetUsersByProjectId(string ProjectsId)
        {
            return _context.ApplicationUser.Where(user => user.ProjectsId == ProjectsId);           
        }

        public IEnumerable<ApplicationUser> GetUsersByTicketId(string TicketsId)
        {
            return _context.ApplicationUser.Where(user => user.TicketsId == TicketsId);
        }

        public IEnumerable<Projects> GetProjectsByUserId(string ApplicationUserId)
        {
            return _context.Projects.Where(project => project.ApplicationUserId == ApplicationUserId);
        }

        public IEnumerable<Tickets> GetTicketsByProjectId(string ProjectsId)
        {
            return _context.Tickets.Where(ticket => ticket.ProjectsId == ProjectsId);
        }

        public IEnumerable<Tickets> GetTicketsByUserId(string ApplicationUserId)
        {
            return _context.Tickets.Where(ticket => ticket.ApplicationUserId == ApplicationUserId);
        }

        public IEnumerable<Notification> GetNotificationsByUserId(string ApplicationUserId)
        {
            return _context.Notification.Where(notification => notification.ApplicationUserId == ApplicationUserId);
        }

        public Tickets GetTicketByTitle(string title)
        {
            return _context.Tickets.FirstOrDefault(ticket => ticket.title == title);
        }

        public Projects GetProjectByName(string Projectsname)
        {
            return _context.Projects.FirstOrDefault(project => project.Projectsname == Projectsname);
        }

        public ApplicationUser GetUserByLoginInfo(string username, string password)
        {
            return _context.ApplicationUser.FirstOrDefault(user => user.ApplicationUserusername == username && user.password == password);
        }

        public IEnumerable<ChangeLog> GetLogsByTicketTitle(string title)
        {
            return _context.ChangeLog.Where(log => log.Title == title);
        }
        
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
