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
            CreateMap<AssignUserDto, ApplicationUser>();
            CreateMap<AssignUserDto, Projects>();
        }
    }
}
