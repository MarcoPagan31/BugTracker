using System.Collections.Generic;
using IssueTracker.Data;
using IssueTracker.Dtos;
using IssueTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System;
using Microsoft.AspNetCore.SignalR;
using IssueTracker.Infrastructure;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IssueTracker.Controllers
{
    [Route("api/[controller]")]
    public class IssueTrackerController : Controller
    {
        private readonly UsersContext _context;
        private readonly IIssueTrackerRepo _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private readonly ILogger<ApplicationUser> _logger;
        private readonly IHubContext<NotificationHub> _notificationHub;

        public IssueTrackerController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IIssueTrackerRepo repository, UsersContext context, IMapper mapper, IEmailSender emailSender, IHubContext<NotificationHub> notificationHub)
        {
            _context = context;
            _repository = repository;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _emailSender = emailSender;
            _notificationHub = notificationHub;
        }

        [HttpGet("getallusers")]
        public ActionResult <IEnumerable<ApplicationUser>> GetAllUsers()
        {
            var users = _repository.GetAllUsers();

            return Ok(users);
        }

        [AllowAnonymous]
        [HttpPost("getuser")]
        public async Task<ApplicationUser> GetUserByName([FromBody] FindByNameDto nameDto)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(nameDto.ApplicationUserusername);
            //await _userManager.FindByNameAsync(loginDto.ApplicationUserusername);
            return user;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] ApplicationUser model)
        {
            var user = new ApplicationUser()
            {
                ApplicationUserusername = model.ApplicationUserusername,
                UserName = model.ApplicationUserusername,
                password = model.password,
                Email = model.Email,
            };

            await _userManager.CreateAsync(user, model.password);
        
            var result = await _signInManager.PasswordSignInAsync(user, model.password, false, false);

            if (result.Succeeded)
            {
                // sign user in
                return RedirectToAction("manageprojects");
            }

            return RedirectToAction("manageprojects");
        }

        //FK
        [Authorize]
        [HttpPost("home")]
        public ActionResult <IEnumerable<ApplicationUser>> GetUsersByProjectId([FromBody] FindByProjectIdDto project)
        {
            var users = _repository.GetUsersByProjectId(project.ProjectsId);

            return Ok(users);
        }
        
        // POST Add user to both ApplicationUser and Projects object
        [Authorize]
        [HttpPost("addusertoproject")]
        public async Task<ActionResult> AddUserToProject([FromBody] AssignUserDto assignUserDto)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(assignUserDto.ApplicationUserusername);
            Projects project = _repository.GetProjectByName(assignUserDto.Projectsname);

            user.ProjectsId = assignUserDto.Id;
            await _userManager.UpdateAsync(user);
            _mapper.Map(assignUserDto, project);
            _repository.SaveChanges();

            await _notificationHub.Clients.Group(assignUserDto.ApplicationUserusername).SendAsync("assignusertoproject", "An admin assigned the " +assignUserDto.Projectsname + " project to you");
            var notification = "An admin assigned the " + assignUserDto.Projectsname + " project to you";

            var noti = new Models.Notification()
            {
                name = notification,
                ApplicationUserId = user.Id
            };

            _repository.CreateNotification(noti);

            _repository.SaveChanges();

            return Ok();
        }

        // POST Remove user from both ApplicationUser and Projects object
        [Authorize]
        [HttpPost("removeuserfromproject")]
        public async Task<ActionResult> RemoveUserFromProject([FromBody] AssignUserDto assignUserDto)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(assignUserDto.ApplicationUserusername);
            Projects project = _repository.GetProjectByName(assignUserDto.Projectsname);

            user.ProjectsId = null;
            project.ApplicationUserId = null;
            project.ApplicationUserusername = null;
            await _userManager.UpdateAsync(user);
            _repository.SaveChanges();

            await _notificationHub.Clients.Group(assignUserDto.ApplicationUserusername).SendAsync("removeuserfromproject", "An admin removed you from the " + assignUserDto.Projectsname + " project");
            var notification = "An admin removed you from the " + assignUserDto.Projectsname + " project";

            var noti = new Models.Notification()
            {
                name = notification,
                ApplicationUserId = user.Id
            };

            _repository.CreateNotification(noti);

            _repository.SaveChanges();

            return Ok();
        }
        

        // POST Add user to both ApplicationUser and Projects object
        [Authorize]
        [HttpPost("addusertoticket")]
        public async Task<ActionResult> AddUserToTicket([FromBody] AssignUserToTicketDto assignUserDto)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(assignUserDto.ApplicationUserusername);
            Tickets ticket = _repository.GetTicketByTitle(assignUserDto.title);

            user.TicketsId = assignUserDto.TicketsId;
            await _userManager.UpdateAsync(user);
            _mapper.Map(assignUserDto, ticket);
            _repository.SaveChanges();
            return Ok();
        }

        // POST Add user to both ApplicationUser and Projects object
        [Authorize]
        [HttpPost("removeuserfromticket")]
        public async Task<ActionResult> RemoveUserFromTicket([FromBody] AssignUserToTicketDto assignUserDto)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(assignUserDto.ApplicationUserusername);
            Tickets ticket = _repository.GetTicketByTitle(assignUserDto.title);

            user.TicketsId = null;
            ticket.ApplicationUserId = null;
            ticket.ApplicationUserusername = null;
            await _userManager.UpdateAsync(user);
            _repository.SaveChanges();
            return Ok();
        }
        
        //FK
        [Authorize]
        [HttpPost("userprojects")]
        public ActionResult<IEnumerable<Projects>> GetProjectsByUserId([FromBody] UserDto user)
        {
            var projects = _repository.GetProjectsByUserId(user.ApplicationUserId);

            return Ok(projects);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var result = await _signInManager.PasswordSignInAsync(loginDto.ApplicationUserusername, loginDto.password, false, false);

            try
            {
                if (result.Succeeded)
                {
                    return Ok();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost("logindemo")]
        public async Task<IActionResult> LoginDemo([FromBody] LoginDemoDto loginDto)
        {

            var user = new ApplicationUser()
            {
                ApplicationUserusername = loginDto.ApplicationUserusername,
                password = loginDto.password,
                UserName = loginDto.ApplicationUserusername,
                Email = loginDto.email,
                role = loginDto.role
            };

            await _userManager.CreateAsync(user, loginDto.password);

            var result = await _signInManager.PasswordSignInAsync(user, loginDto.password, false, false);

            if (result.Succeeded)
            {
                return RedirectToAction("dashboard");
            }
            
            return RedirectToAction("dashboard");

        }

        [AllowAnonymous]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("sendemail")]
        public async Task<ActionResult> SendEmail()
        {
            var message = new Message(new string[] { "marcoapagan@gmail.com" }, "Test email", "This is the content from our email.");
            await _emailSender.SendEmailAsync(message);

            return Ok();
        }

        [Authorize]
        [HttpPost("editprofile")]
        public void EditProfile([FromBody] ApplicationUser users)
        {
            ApplicationUser user = _repository.GetUserByName(users.oldUsername);
            user.ApplicationUserusername = users.ApplicationUserusername;
            user.Email = users.Email;
            user.password = users.password;
            _repository.SaveChanges();
        }

        [Authorize]
        [HttpPost("fileupload")]
        public ActionResult FileUpload([FromForm] FileDto upload)
        {
            Tickets ticket = _repository.GetTicketByTitle(upload.title);

            string fileName = null;

            if(upload.file != null)
            {
                string uploadsFolder = Path.Combine("Files", "Uploads");
                fileName = Guid.NewGuid().ToString() + "_" + upload.file.FileName;
                string filePath = Path.Combine(uploadsFolder, fileName);
                upload.file.CopyTo(new FileStream(filePath, FileMode.Create));
            }

            ticket.filePath = upload.file.FileName;

            _repository.SaveChanges();

            return Ok();
        }

        [Authorize]
        [HttpPost("profileimageupload")]
        public async Task<ActionResult> ProfileImageUploadAsync([FromForm] ImageDto upload)
        {
          
            ApplicationUser user = await _userManager.FindByNameAsync(upload.ApplicationUserusername);

            string fileName = null;

            if (upload.image != null)
            {
                string uploadsFolder = Path.Combine("Files", "Uploads");
                fileName = Guid.NewGuid().ToString() + "_" + upload.image.FileName;
                string filePath = Path.Combine(uploadsFolder, fileName);
                upload.image.CopyTo(new FileStream(filePath, FileMode.Create));
            }

            _repository.SaveChanges();

            string profileImage = "Files/Uploads/" + fileName;

            byte[] byteData = System.IO.File.ReadAllBytes(profileImage);

            string imreBase64Data = Convert.ToBase64String(byteData);

            string imgDataURL = string.Format("data:image/png;base64,{0}", imreBase64Data);

            user.filePath = imgDataURL;

            await _userManager.UpdateAsync(user);

            return Ok();
        }

        [Authorize]
        [HttpPost("retrieveprofileimage")]
        public async Task<ActionResult> RetrieveProfileImage([FromBody] FindByNameDto nameDto)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(nameDto.ApplicationUserusername);

            return Ok(user);
        }
    }
}
