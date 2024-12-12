using LendACarAPI.Data;
using LendACarAPI.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LendACarAPI.Endpoints
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController(ApplicationDbContext db) : ControllerBase
    {
        [HttpGet("getAll")]
        public async Task<ActionResult<Country[]>> GetAllCountries(CancellationToken cancellationToken)
        {
            var countries = await db.Countries
                .OrderBy(c=>c.Name)
                .ToArrayAsync(cancellationToken);

            return Ok(countries);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateCountry([FromBody] Country country,CancellationToken cancellationToken)
        {
            db.Countries.Add(country);
            await db.SaveChangesAsync(cancellationToken);

            return Created();
        }
    }
}
