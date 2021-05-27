using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IssueTracker.Data;
using IssueTracker.Dtos;
using IssueTracker.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IssueTracker.Controllers
{
    [Route("api/[controller]")]
    public class RoleController : Controller
    {
        private readonly IIssueTrackerRepo _repository;
        private readonly UsersContext _context;
        private readonly IMapper _mapper;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public RoleController(UsersContext context, IMapper mapper, IIssueTrackerRepo repository, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            _repository = repository;
            _context = context;
            _mapper = mapper;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [Authorize]
        [HttpPost("addrole")]
        public async Task<IActionResult> AddRole([FromBody] RoleDto roleDto)
        {
            if(!(await _roleManager.RoleExistsAsync(roleDto.role)))
            {
                await _roleManager.CreateAsync(new IdentityRole(roleDto.role));
            }

            ApplicationUser user = await _userManager.FindByNameAsync(roleDto.applicationUserusername);
            var result = await _userManager.AddToRoleAsync(user, roleDto.role);
            _mapper.Map(roleDto, user);
            await _userManager.UpdateAsync(user);
            _repository.SaveChanges();

            if (result.Succeeded)
            {
                return Ok(result);
            }
            
            return BadRequest(result);

        }
    }
}
