using LendACarAPI.Data;
using LendACarAPI.Helper.Auth;
using Microsoft.EntityFrameworkCore;

var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", false)
    .Build();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(config.GetConnectionString("db")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(x => x.OperationFilter<MyAuthorizationSwaggerHeader>());
builder.Services.AddHttpContextAccessor();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowEverything", policy =>
    {
        policy
            .SetIsOriginAllowed(x => _ = true) // Allow all origins
            .AllowAnyMethod()  // Allow all methods (GET, POST, etc.)
            .AllowAnyHeader()  // Allow all headers
            .AllowCredentials();  // Allow credentials (cookies, headers, etc.)
    });
});

//dodajte va�e servise

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowEverything");  // Apply the CORS policy

app.UseAuthorization();

app.MapControllers();

app.Run();
