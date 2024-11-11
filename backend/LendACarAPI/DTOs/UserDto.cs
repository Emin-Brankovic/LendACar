﻿using LendACarAPI.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace LendACarAPI.DTOs
{
    public class UserDto
    {
        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        [Required]
        [Phone]
        public string? PhoneNumber { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        public int CityId { get; set; }
        public City? City { get; set; }

        [Required]
        [EmailAddress]
        public string? EmailAdress { get; set; }

        [Required]
        public string? Username { get; set; }
        public double AverageRating { get; set; } = 0.0;
    }
}
