using System;
using Microsoft.AspNetCore.Http;

namespace IssueTracker.Dtos
{
    public class FileDto
    {
       

        public IFormFile? file { get; set; }
        public string title { get; set; }

        public FileDto()
        {
           
        }
    }
}
