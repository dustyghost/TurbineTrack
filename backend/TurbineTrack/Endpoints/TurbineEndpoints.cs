using Microsoft.EntityFrameworkCore;
using TurbineTrack.Api.Data;
using TurbineTrack.Api.Models;

namespace TurbineTrack.Api.Endpoints;

public static class TurbineEndpoints
{
    public static void MapTurbineEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/", () => "Welcome to TurbineTrack API!").WithOpenApi();
        
        app.MapGet("/turbines", async (TurbineContext db) =>
            await db.Turbines.ToListAsync());

        app.MapGet("/turbines/{id}", async (int id, TurbineContext db) =>
            await db.Turbines.FindAsync(id)
                is { } turbine
                ? Results.Ok(turbine)
                : Results.NotFound());

        app.MapPost("/turbines", async (Turbine turbine, TurbineContext db) =>
        {
            db.Turbines.Add(turbine);
            await db.SaveChangesAsync();
            return Results.Created($"/turbines/{turbine.Id}", turbine);
        });

        app.MapPut("/turbines/{id}", async (int id, Turbine inputTurbine, TurbineContext db) =>
        {
            var turbine = await db.Turbines.FindAsync(id);

            if (turbine is null) return Results.NotFound();

            turbine.Location = inputTurbine.Location;
            turbine.Status = inputTurbine.Status;
            turbine.PowerOutput = inputTurbine.PowerOutput;
            turbine.WindSpeed = inputTurbine.WindSpeed;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        app.MapDelete("/turbines/{id}", async (int id, TurbineContext db) =>
        {
            if (await db.Turbines.FindAsync(id) is not { } turbine)
                return Results.NotFound();

            db.Turbines.Remove(turbine);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}