﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LendACarAPI.Data.Models
{

    //TO DO:
    //Nekako zamijeniti ovaj password sa hash i salt 
    // valjda nece crash baza i app ako hoce onda izbrisi usere i napraviti nove preko app
    public class User:Person
    {

        [Required]
        [EmailAddress]
        public string EmailAdress { get; set; }

        //[Required]
        //public string Password { get; set; }

        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }

        [Required]
        public string Username { get; set; }
        public DateTime CreatedDate { get; set; }
        public double AverageRating { get; set; } = 0.0;
        [Required]
        public bool IsVerified { get; set; } = false;
        [Required]
        public bool IsBanned { get; set; } = false;


        // Najvjerovatnije cemo koristiti string sa URL-om koji prikazuje sliku vozacke dozvole
        public DriversLicense DriversLicense { get; set; }

    }
}
