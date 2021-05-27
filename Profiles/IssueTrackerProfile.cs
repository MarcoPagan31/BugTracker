using AutoMapper;
using IssueTracker.Dtos;
using IssueTracker.Models;

namespace IssueTracker.Profiles
{
    public class IssueTrackerProfile : Profile
    {
        public IssueTrackerProfile()
        {
            //Source - Target
            CreateMap<UserCreateDto, ApplicationUser>();
            CreateMap<AssignUserDto, Projects>();
            CreateMap<AssignUserToTicketDto, Tickets>();
            CreateMap<RoleDto, ApplicationUser>();
            CreateMap<CommentDto, Tickets>();
            CreateMap<EditProjectDto, Projects>();
        }
    }
}
