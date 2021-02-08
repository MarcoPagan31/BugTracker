/*using System;
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

        public ApplicationUser GetUserByName(string ApplicationUserusername)
        {
            return _context.ApplicationUser.FirstOrDefault(user => user.ApplicationUserusername == ApplicationUserusername);
        }

        public IEnumerable<ApplicationUser>GetUsersByProjectName(string Projectsname)
        {
            return _context.ApplicationUser.Where(user => user.Projectsname == Projectsname);           
        }

        public IEnumerable<Projects> GetProjectsByUserName(string ApplicationUserusername)
        {
            return _context.Projects.Where(project => project.ApplicationUserusername == ApplicationUserusername);
        }

        public IEnumerable<Tickets> GetTicketsByProjectName(string Projectsname)
        {
            return _context.Tickets.Where(ticket => ticket.Projectsname == Projectsname);

        }

        public Projects GetProjectByName(string Projectsname)
        {
            return _context.Projects.FirstOrDefault(project => project.Projectsname == Projectsname);
        }

        public ApplicationUser GetUserByLoginInfo(string username, string password)
        {
            return _context.ApplicationUser.FirstOrDefault(user => user.ApplicationUserusername == username && user.password == password);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
*/