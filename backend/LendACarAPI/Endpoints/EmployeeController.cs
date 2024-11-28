﻿using LendACarAPI.Data;
using LendACarAPI.Data.Models;
using LendACarAPI.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace LendACarAPI.Endpoints
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController(ApplicationDbContext db) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult<string>> RegisterEmployee([FromBody] RegisterEmployeeDto registerEmployee)
        {
            var hmac = new HMACSHA256();

            if(await EmployeeExists(registerEmployee.Username,registerEmployee.EmailAdress)) { return BadRequest("Username or email is taken"); }

            var employee = new Employee
            {
                FirstName = registerEmployee.FirstName,
                LastName = registerEmployee.LastName,
                BirthDate = DateTime.Parse(registerEmployee.BirthDate),
                PhoneNumber = registerEmployee.PhoneNumber,
                CityId = registerEmployee.CityId,
                EmailAdress = registerEmployee.EmailAdress,
                Username = registerEmployee.Username,
                JobTitle = registerEmployee.JobTitle,
                WorkingHourId = registerEmployee.WorkingHourId,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerEmployee.Password)),
                PasswordSalt = hmac.Key,
                DateOfHire = new DateOnly(2024, 11, 25)
            };

            db.Employees.Add(employee);
           await db.SaveChangesAsync();

            return Created();
        }

        [HttpPost("login")]

        public async Task<ActionResult<EmployeeDto>> LoginEmployee([FromBody] EmployeeLoginDto employeeLogin)
        {
            var employee = await db.Employees
            .Include(e => e.City)
            .Include(e => e.City != null ? e.City.Country : null)
            .Include(e=> e.WorkingHour)
            .FirstOrDefaultAsync(e => e.EmailAdress.ToLower() == employeeLogin.EmailAddress.ToLower());

            if(employee == null)
                return Unauthorized("Invalid credentials");

            var hmac = new HMACSHA256(employee.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(employeeLogin.Password));

            for (var i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != employee.PasswordHash[i]) 
                    return Unauthorized("Invalid credentials");
            }

            return Ok(new EmployeeDto
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                PhoneNumber = employee.PhoneNumber,
                BirthDate = employee.BirthDate.ToString("dd.MM.yyyy"),
                City = employee.City,
                CityId = employee.CityId,
                EmailAddress = employee.EmailAdress,
                Username = employee.Username,
                JobTitle = employee.JobTitle,
                WorkingHour = employee.WorkingHour,
                WorkingHourId = employee.WorkingHourId,
            });

        }
        

        private async Task<bool> EmployeeExists(string username, string email)
        {
            return await db.Employees.AnyAsync(user => user.Username.ToLower() == username.ToLower()
            && user.EmailAdress.ToLower() == email.ToLower());
        }

    }
}