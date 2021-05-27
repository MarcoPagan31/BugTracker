using System;
using Microsoft.AspNetCore.Http;

namespace IssueTracker.Dtos
{
    public class ImageDto
    {
        public IFormFile? image { get; set; }
        public string ApplicationUserusername { get; set; }

        public ImageDto()
        {
            
        }
    }
}
