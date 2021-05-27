using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IssueTracker.Data;
using IssueTracker.Dtos;
using IssueTracker.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IssueTracker.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        private readonly IIssueTrackerRepo _repository;
        private readonly UsersContext _context;
        private readonly IMapper _mapper;

        public ProjectController(UsersContext context, IMapper mapper, IIssueTrackerRepo repository)
        {
            _repository = repository;
            _context = context;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<IEnumerable<Projects>> GetAllProjects()
        {
            var projects = _repository.GetAllProjects();

            return Ok(projects);
        }

        [Authorize]
        [HttpPost("getproject")]
        public ActionResult GetProjectByName([FromBody] ProjectDto projectDto)
        {
            Projects project = _repository.GetProjectByName(projectDto.Projectsname);
            return Ok(project);
        }

        [Authorize]
        [HttpPost]
        public void CreateProject([FromBody] Projects project)
        {
            _repository.CreateProject(project);
            _repository.SaveChanges();
        }

        [Authorize]
        [HttpPost("editproject")]
        public void EditProject([FromBody] Projects projects)
        {
            Projects project = _repository.GetProjectByName(projects.oldProjectsName);
            project.Projectsname = projects.Projectsname;
            project.description = projects.description;
            _repository.SaveChanges();
        }

        [Authorize]
        [HttpPost("deleteproject")]
        public void DeleteProject([FromBody] ProjectDto projectDto)
        {
            var project = _repository.GetProjectByName(projectDto.Projectsname);

            _repository.DeleteProject(project);
            _repository.SaveChanges();
        }
    }
}
