using TurbineTrack.Api.Models;

namespace TurbineTrack.Api.Repositories;

public interface IRegionRepository
{
    Task<IEnumerable<Country>> GetAllCountriesAsync();
    Task<IEnumerable<Area>> GetAllAreasAsync();
    Task<IEnumerable<Area>> GetAreasByCountryIdAsync(int countryId);
}