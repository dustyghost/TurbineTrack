using Microsoft.EntityFrameworkCore;
using TurbineTrack.Api.Data;
using TurbineTrack.Api.Models;

namespace TurbineTrack.Api.Repositories;

public class RegionRepository(TurbineContext context) : IRegionRepository
{
    public async Task<IEnumerable<Country>> GetAllCountriesAsync()
    {
        return await context.Countries.ToListAsync();
    }

    public async Task<IEnumerable<Area>> GetAllAreasAsync()
    {
        return await context.Areas.ToListAsync();
    }

    public async Task<IEnumerable<Area>> GetAreasByCountryIdAsync(int countryId)
    {
        return await context.Areas
            .Where(a => a.CountryId == countryId)
            .ToListAsync();
    }
}