using Microsoft.EntityFrameworkCore;
using TurbineTrack.Api.Data;
using TurbineTrack.Api.Models;

namespace TurbineTrack.Api.Repositories;

public class TurbineRepository(TurbineContext context) : ITurbineRepository
{
    public async Task<IEnumerable<Turbine>> GetAllAsync()
    {
        return await context.Turbines
            .Include(t => t.Area)
            .ThenInclude(a => a.Country)
            .ToListAsync();
    }

    public async Task<Turbine?> GetByIdAsync(int id)
    {
        return await context.Turbines
            .Include(t => t.Area)
            .ThenInclude(a => a.Country)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<Turbine> AddAsync(Turbine turbine)
    {
        context.Turbines.Add(turbine);
        await context.SaveChangesAsync();
        return turbine;
    }

    public async Task<bool> UpdateAsync(int id, Turbine updated)
    {
        var turbine = await context.Turbines.FindAsync(id);
        if (turbine is null) return false;

        turbine.Location = updated.Location;
        turbine.Status = updated.Status;
        turbine.PowerOutput = updated.PowerOutput;
        turbine.WindSpeed = updated.WindSpeed;
        turbine.AreaId = updated.AreaId;

        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var turbine = await context.Turbines.FindAsync(id);
        if (turbine is null) return false;

        context.Turbines.Remove(turbine);
        await context.SaveChangesAsync();
        return true;
    }
}