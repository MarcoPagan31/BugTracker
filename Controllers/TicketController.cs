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

namespace IssueTracker.Controllers
{
    [Route("api/[controller]")]
    public class TicketController : Controller
    {
        private readonly IIssueTrackerRepo _repository;
        private readonly UsersContext _context;
        private readonly IMapper _mapper;

        public TicketController(UsersContext context, IMapper mapper, IIssueTrackerRepo repository)
        {
            _repository = repository;
            _context = context;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<IEnumerable<Tickets>> GetAllTickets()
        {
            var tickets = _repository.GetAllTickets();

            return Ok(tickets);
        }

        //FK
        [Authorize]
        [HttpPost("home")]
        public ActionResult<IEnumerable<Tickets>> GetAllTicketsByProjectId([FromBody] FindByProjectIdDto project)
        {
            var tickets = _repository.GetTicketsByProjectId(project.ProjectsId);

            return Ok(tickets);
        }

        //FK
        [Authorize]
        [HttpPost("ticketusers")]
        public ActionResult<IEnumerable<ApplicationUser>> GetUsersByTicketId([FromBody] TicketDto ticket)
        {
            var users = _repository.GetUsersByTicketId(ticket.TicketsId);

            return Ok(users);
        }

        //FK
        [Authorize]
        [HttpPost("usertickets")]
        public ActionResult<IEnumerable<Tickets>> GetTicketsByUserId([FromBody] UserDto userDto)
        {
            var tickets = _repository.GetTicketsByUserId(userDto.ApplicationUserId);

            return Ok(tickets);
        }

        [Authorize]
        [HttpPost("details")]
        public ActionResult<Tickets> GetTicketByTitle([FromBody] FindByTitleDto findByTitleDto)
        {
            var ticketDetails = _repository.GetTicketByTitle(findByTitleDto.title);

            return ticketDetails;
        }

        [Authorize]
        [HttpPost("addcomment")]
        public void AddComment([FromBody] CommentDto commentDto)
        {
            var ticket = _repository.GetTicketByTitle(commentDto.tickettitle);

            _mapper.Map(commentDto, ticket);
            _repository.SaveChanges();
        }

        [Authorize]
        [HttpPost("editticket")]
        public void EditTicket([FromBody] Tickets ticket)
        {
            Tickets tickets = _repository.GetTicketByTitle(ticket.oldTitle);
            tickets.title = ticket.title;
            tickets.submitter = ticket.submitter;
            tickets.developer = ticket.developer;
            tickets.priority = ticket.priority;
            tickets.type = ticket.type;
            tickets.status = ticket.status;
            _repository.SaveChanges();
        }

        [Authorize]
        [HttpPost]
        public void Post([FromBody] Tickets ticket)
        {
            _repository.CreateTicket(ticket);
            _repository.SaveChanges();
        }

        [Authorize]
        [HttpPost("getlogs")]
        public ActionResult<IEnumerable<ChangeLog>> GetLogsByTicketTitle([FromBody] FindByTitleDto ticket)
        {
            var logs = _repository.GetLogsByTicketTitle(ticket.title);

            return Ok(logs);
        }
    }
}
