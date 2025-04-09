using Microsoft.EntityFrameworkCore;
using TurbineTrack.Api.Data;
using TurbineTrack.Api.Models;

namespace TurbineTrack.Tests;

public class TurbineTests
{
    public static IEnumerable<object[]> TurbineSeedData =>
        new List<object[]>
        {
            new object[]
            {
                new List<Turbine>
                {
                    new() { Location = "Ashby Farm", Status = "Operational", PowerOutput = 145.5, WindSpeed = 9.3, Country = "UK", Area = "Leicestershire" },
                    new() { Location = "Nordwind Alpha", Status = "Operational", PowerOutput = 160.8, WindSpeed = 10.2, Country = "Germany", Area = "Lower Saxony" },
                }
            }
        };
    
    [Theory]
    [MemberData(nameof(TurbineSeedData))]
    public async Task Can_Add_And_Retrieve_Turbines(List<Turbine> seedTurbines)
    {
        var options = new DbContextOptionsBuilder<TurbineContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        await using var context = new TurbineContext(options);

        context.Turbines.AddRange(seedTurbines);
        await context.SaveChangesAsync();

        var turbines = await context.Turbines.OrderBy(t => t.Location).ToListAsync();

        Assert.Equal(seedTurbines.Count, turbines.Count);
        
        for (int i = 0; i < seedTurbines.Count; i++)
        {
            Assert.Equal(seedTurbines[i].Location, turbines[i].Location);
            Assert.Equal(seedTurbines[i].Status, turbines[i].Status);
            Assert.Equal(seedTurbines[i].Country, turbines[i].Country);
        }
    }

}