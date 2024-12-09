﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LendACarAPI.Data.Models
{
    public class VehicleImage
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Vehicle))]
        [Required]
        public int VehicleID { get; set; }
        public Vehicle? Vehicle { get; set; }

        // Korisitit cemo string sa URL-om od slike vozila
        [Required]
        public byte[] Image { get; set; }
    }
}
