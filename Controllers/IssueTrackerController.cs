using System.Collections.Generic;
using IssueTracker.Data;
using IssueTracker.Dtos;
using IssueTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IssueTracker.Controllers
{
    [Route("api/[controller]")]
    public class IssueTrackerController : ControllerBase
    {
        //private readonly IIssueTrackerRepo _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public IssueTrackerController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            //_repository = repository;
            _userManager = userManager;
            _signInManager = signInManager;
        }


        /*// GET: api/values
        [HttpGet]
        public ActionResult <IEnumerable<ApplicationUser>> GetAllUsers()
        {
            var users = _repository.GetAllUsers();

            return Ok(users);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
        
        // POST Create User without Identity
        [HttpPost]
        public void Post([FromBody] Users user)
        {
            _repository.CreateUser(user);
            _repository.SaveChanges();
        }*/

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] ApplicationUser model)
        {
            var user = new ApplicationUser()
            {
                ApplicationUserusername = model.ApplicationUserusername,
                UserName = model.ApplicationUserusername,
                password = model.password,
                Email = model.Email,
                role = model.role,
            };

            var result = await _userManager.CreateAsync(user, model.password);
            
            if (result.Succeeded)
            {
                // sign user in
                var signInResult = await _signInManager.PasswordSignInAsync(user, model.password, false, false);

                if (signInResult.Succeeded)
                {
                    return RedirectToAction("dashboard");
                }
            }

            return RedirectToAction("dashboard");
        }

        /*[HttpPost]
        public async Task<IActionResult> GetUsersByProjectName2([FromBody] ApplicationUser model)
        {
            var users = _userManager.
        }

        // POST api/values
        [HttpPost("home")]
        public ActionResult<IEnumerable<ApplicationUser>> GetUsersByProjectName([FromBody] ProjectDto project)
        {
            var users = _repository.GetUsersByProjectName(project.Projectsname);

            return Ok(users);
        }

        // POST api/values
        /*[HttpPost("dashboard")]
        public ActionResult<IEnumerable<Projects>> GetProjectsByUserName([FromBody] UserDto user)
        {
            var projects = _repository.GetProjectsByUserName(user.ApplicationUserusername);

            return Ok(projects);
        }*/

        // POST api/values
        /*[HttpPost("dashboard")]
        public async Task<IActionResult> GetProjectsByUserName([FromBody] UserDto user)
        {
            var projects = _repository.GetProjectsByUserName(user.ApplicationUserusername);

            return Ok(projects);
        }*/

        /*
        //Login Without Identity
        [HttpPost("login")]
        public ActionResult<IEnumerable<ApplicationUser>> Login([FromBody] LoginDto loginInfo)
        {
            var user = _repository.GetUserByLoginInfo(loginInfo.username, loginInfo.password);

            HttpContext.Session.SetString("username", loginInfo.username);
            HttpContext.Session.SetString("password", loginInfo.password);
            
            return Ok(user);
        }
        */

        [HttpPost("login")]
        public async Task<IActionResult> Login(string username, string password)
        {
            //login functionality
            var user = await _userManager.FindByNameAsync(username);

            if(user != null)
            {
                var signInResult = await _signInManager.PasswordSignInAsync(user, password, false, false);

                if (signInResult.Succeeded)
                {
                    return RedirectToAction("dashboard");
                }
            }

            return RedirectToAction("dashboard");

        }


        [HttpPost("logout")]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Login");
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
    }
}
