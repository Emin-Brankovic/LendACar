﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LendACarAPI.Data.Models
{

    //TO DO:
    //Promijeniti start time i end time u timeonly objete i skloniti ovo za companyemployee i dodati workinghour u companyemployee
    public class WorkingHour
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public TimeOnly StartTime { get; set; }
        [Required]
        public TimeOnly EndTime { get; set; }

        public bool Monday { get; set; } = true;
        public bool Tuesday { get; set; }= true;
        public bool Wednesday { get; set; } = true;
        public bool Thursday { get; set; } = true;
        public bool Friday { get; set; } = true;
        public bool Saturday { get; set; } = true;
        public bool Sunday { get; set; } = true;
    }
}
