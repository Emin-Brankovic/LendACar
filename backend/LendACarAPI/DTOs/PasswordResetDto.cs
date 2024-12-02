﻿using System.ComponentModel.DataAnnotations;

namespace LendACarAPI.DTOs
{
    public class PasswordResetDto
    {
        [Required]
        public string? EmailAddress { get; set; }
        public string? CurrentPassword { get; set; }
        [Required]
        public string? NewPassword { get; set; }
    }
}
