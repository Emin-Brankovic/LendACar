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
            var searchCountry = db.Countries
                .FirstOrDefault(c => c.Name == country.Name);
            if (searchCountry != null) return BadRequest();

            db.Countries.Add(country);
            await db.SaveChangesAsync(cancellationToken);

            return Created();
        }

        [HttpDelete("remove/{id}")]
        public async Task<ActionResult> RemoveCountry([FromRoute] int id, CancellationToken cancellationToken)
        {
            var country = await db.Countries.FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
            if (country == null) return BadRequest();

            var cities=await db.Cities
                .Where(c=>c.CountryId== id)
                .ToArrayAsync();


            db.RemoveRange(cities);
            //await db.SaveChangesAsync(cancellationToken);

            db.Remove(country);
            await db.SaveChangesAsync(cancellationToken);
            return Ok();
        }
    }
}
