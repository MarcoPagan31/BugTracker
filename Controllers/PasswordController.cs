using System.Collections.Generic;
using IssueTracker.Data;
using IssueTracker.Dtos;
using IssueTracker.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.Extensions.Options;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using System.Linq;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IssueTracker.Controllers
{
    [Route("[controller]")]
    public class PasswordController : Controller
    {
        private readonly UsersContext _context;
        private readonly IIssueTrackerRepo _repository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;

        public PasswordController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IIssueTrackerRepo repository, UsersContext context, IEmailSender emailSender)
        {
            _context = context;
            _repository = repository;
            _userManager = userManager;
            _emailSender = emailSender;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string token, string email)
        {
            // If password reset token or email is null, most likely the
            // user tried to tamper the password reset link
            if (token == null || email == null)
            {
                ModelState.AddModelError("", "Invalid password reset token");
            }
            return View();
        }

        [AllowAnonymous]
        [HttpPost("forgotpassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPassword forgotPassword)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser user = await _userManager.FindByEmailAsync(forgotPassword.Email);

                if (user != null)
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                    var passwordResetLink = Url.Action("resetpassword", "Password",
                        new { email = forgotPassword.Email, token = token }, Request.Scheme);

                    var message = new Message(new string[] { user.Email }, "Test email", passwordResetLink);
                    await _emailSender.SendEmailAsync(message);
                }
            }
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> ResetPassword(ResetPassword model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
                    if (!result.Succeeded)
                    {
                        foreach (var error in result.Errors)
                        {
                            ModelState.TryAddModelError(error.Code, error.Description);
                        }

                        return View();
                    }
                    await _userManager.UpdateAsync(user);
                    _repository.SaveChanges();
                    return View("ResetConfirmation");
                }
               
            }
            return View(model);
        }
    }
}
