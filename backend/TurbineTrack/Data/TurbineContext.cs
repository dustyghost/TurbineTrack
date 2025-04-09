using Microsoft.EntityFrameworkCore;
using TurbineTrack.Api.Models;

namespace TurbineTrack.Api.Data
{
    public class TurbineContext(DbContextOptions<TurbineContext> options) 
        : DbContext(options)
    {
        public DbSet<Turbine> Turbines { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Area> Areas { get; set; }

    }
}