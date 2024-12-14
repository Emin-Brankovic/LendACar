using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace LendACarAPI.Data.Models
{
    public class UpdateVehicleModelRequest
    {
        public string ModelName { get; set; }
        public string newModelName { get; set; }
    }
}