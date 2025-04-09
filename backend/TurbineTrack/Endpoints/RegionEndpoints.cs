using TurbineTrack.Api.Repositories;

namespace TurbineTrack.Api.Endpoints;

public static class RegionEndpoints
{
    public static void MapRegionEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/countries", async (IRegionRepository repo) =>
            Results.Ok(await repo.GetAllCountriesAsync()));

        app.MapGet("/areas", async (IRegionRepository repo) =>
            Results.Ok(await repo.GetAllAreasAsync()));

        app.MapGet("/countries/{countryId}/areas", async (int countryId, IRegionRepository repo) =>
            Results.Ok(await repo.GetAreasByCountryIdAsync(countryId)));
    }
}