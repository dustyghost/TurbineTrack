using Microsoft.EntityFrameworkCore;
using TurbineTrack.Api.Data;
using TurbineTrack.Api.Endpoints;
using TurbineTrack.Api.Models;
using TurbineTrack.Api.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TurbineContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("TurbineContext")));

var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowConfiguredOrigins", policy =>
    {
        policy.WithOrigins(allowedOrigins!)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddScoped<ITurbineRepository, TurbineRepository>();
builder.Services.AddScoped<IRegionRepository, RegionRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); 
    app.UseCors("AllowConfiguredOrigins");
}

// Only enforce HTTPS redirection in non-development environments
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.MapTurbineEndpoints();
app.MapRegionEndpoints();

app.Run();
