using TurbineTrack.Api.Models;

namespace TurbineTrack.Api.Repositories;

public interface ITurbineRepository
{
    Task<IEnumerable<Turbine>> GetAllAsync();
    Task<Turbine?> GetByIdAsync(int id);
    Task<Turbine> AddAsync(Turbine turbine);
    Task<bool> UpdateAsync(int id, Turbine turbine);
    Task<bool> DeleteAsync(int id);
}