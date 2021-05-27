using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using IssueTracker.Data;
using IssueTracker.Dtos;
using IssueTracker.Infrastructure;
using IssueTracker.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IssueTracker.Controllers
{
    [Route("api/[controller]")]
    public class NotificationController : Controller
    {
        private readonly IHubContext<NotificationHub> _notificationHub;
        private readonly UsersContext _context;
        private readonly IIssueTrackerRepo _repository;
        private readonly UserManager<ApplicationUser> _userManager;

        public NotificationController(UserManager<ApplicationUser> userManager, IIssueTrackerRepo repository, UsersContext context, [NotNull] IHubContext<NotificationHub> notificationHub)
        {
            _notificationHub = notificationHub;
            _context = context;
            _repository = repository;
            _userManager = userManager;
        }

        [Authorize]
        [HttpPost("getnotifications")]
        public async Task <ActionResult<IEnumerable<Models.Notification>>> GetNotificationsByUserId([FromBody] FindByNameDto nameDto)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(nameDto.ApplicationUserusername);

            var notifications = _repository.GetNotificationsByUserId(user.Id);

            return Ok(notifications);
        }
    }
}
