using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace LendACarAPI.Data.Models
{
    public class UpdateVehicleBrandRequest
    {
        public string BrandName { get; set; }
        public string newBrandName { get; set; }
    }
}