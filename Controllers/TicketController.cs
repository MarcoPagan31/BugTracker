using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IssueTracker.Data;
using IssueTracker.Dtos;
using IssueTracker.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IssueTracker.Controllers
{
    [Route("api/[controller]")]
    public class TicketController : Controller
    {
        //private readonly IIssueTrackerRepo _repository;
        private readonly UsersContext _context;
        private readonly IMapper _mapper;

        public TicketController(UsersContext context, IMapper mapper)
        {
           // _repository = repository;
            _context = context;
            _mapper = mapper;
        }

        // GET: api/values
        /*[HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST api/values
        [HttpPost("home")]
        public ActionResult<IEnumerable<Tickets>> GetAllTicketsByProjectName([FromBody] ProjectDto project)
        {
            var tickets = _repository.GetTicketsByProjectName(project.Projectsname);

            return Ok(tickets);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] Tickets ticket)
        {
            _repository.CreateTicket(ticket);
            _repository.SaveChanges();
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
