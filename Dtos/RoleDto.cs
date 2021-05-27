using System;
namespace IssueTracker.Dtos
{
    public class RoleDto
    {
        public string role { get; set; }
        public string applicationUserusername { get; set; }

        public RoleDto(string role, string applicationUserusername)
        {
            this.role = role;
            this.applicationUserusername = applicationUserusername;
        }
    }
}
