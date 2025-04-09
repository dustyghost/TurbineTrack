using TurbineTrack.Api.Models;
using TurbineTrack.Api.Repositories;

namespace TurbineTrack.Api.Endpoints;

public static class TurbineEndpoints
{
    public static void MapTurbineEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/turbines", async (ITurbineRepository repo) =>
            Results.Ok(await repo.GetAllAsync()));

        app.MapGet("/turbines/{id}", async (int id, ITurbineRepository repo) =>
            await repo.GetByIdAsync(id) is { } turbine
                ? Results.Ok(turbine)
                : Results.NotFound());

        app.MapPost("/turbines", async (Turbine turbine, ITurbineRepository repo) =>
        {
            var created = await repo.AddAsync(turbine);
            return Results.Created($"/turbines/{created.Id}", created);
        });

        app.MapPut("/turbines/{id}", async (int id, Turbine turbine, ITurbineRepository repo) =>
            await repo.UpdateAsync(id, turbine)
                ? Results.NoContent()
                : Results.NotFound());

        app.MapDelete("/turbines/{id}", async (int id, ITurbineRepository repo) =>
            await repo.DeleteAsync(id)
                ? Results.NoContent()
                : Results.NotFound());
    }
}