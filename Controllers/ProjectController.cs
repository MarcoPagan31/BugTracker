using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IssueTracker.Data;
using IssueTracker.Dtos;
using IssueTracker.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IssueTracker.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        //private readonly IIssueTrackerRepo _repository;
        //private readonly UsersContext _context;
        //private readonly IMapper _mapper;

        private readonly UserManager<Projects> _userManager;
        //private readonly SignInManager<Projects> _signInManager;


        public ProjectController(UserManager<Projects> userManager)
        {
            //_repository = repository;
            _userManager = userManager;
            //_signInManager = signInManager;
        }

        // GET: api/values
        /*[HttpGet]
        public ActionResult<IEnumerable<Projects>> GetAllProjects()
        {
            var projects = _repository.GetAllProjects();

            return Ok(projects);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] Projects project)
        {
            _repository.CreateProject(project);
            _repository.SaveChanges();
        }
        */

        /*[HttpPost]
        public async Task<IActionResult> Register([FromBody] Projects model)
        {
            var user = new Projects()
            {
                Projectsname = model.Projectsname,
                description = model.description,
                UserName = model.Projectsname,
                password = "password",
            };

            var result = await _userManager.CreateAsync(user, model.password);

            if (result.Succeeded)
            {
                return RedirectToAction("Register");
            }

            return RedirectToAction("Register");
        }
        */


        /*
        [HttpPost("adduser")]
        public ActionResult AddUser([FromBody] AssignUserDto assignUserDto)
        {
            ApplicationUser user = _repository.GetUserByName(assignUserDto.ApplicationUserusername);
            Projects project = _repository.GetProjectByName(assignUserDto.Projectsname);
            _mapper.Map(assignUserDto, user);
            _mapper.Map(assignUserDto, project);
            _repository.SaveChanges();
            return NoContent();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        */
    }
}
