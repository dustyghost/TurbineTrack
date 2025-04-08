using Microsoft.EntityFrameworkCore;
using TurbineTrack.Api.Data;
using TurbineTrack.Api.Models;

namespace TurbineTrack.Tests;

public class TurbineTests
{
    [Fact]
    public async Task Can_Add_And_Retrieve_Turbine()
    {
        // Arrange: create an in-memory DB context
        var options = new DbContextOptionsBuilder<TurbineContext>()
            .UseInMemoryDatabase("TestDb")
            .Options;

        await using var context = new TurbineContext(options);

        var newTurbine = new Turbine
        {
            Location = "Test Location",
            Status = "Operational",
            PowerOutput = 150.0,
            WindSpeed = 12.5
        };

        // Act: save and retrieve
        context.Turbines.Add(newTurbine);
        await context.SaveChangesAsync();

        var turbines = await context.Turbines.ToListAsync();

        // Assert
        Assert.Single(turbines);
        Assert.Equal("Test Location", turbines[0].Location);
        Assert.Equal("Operational", turbines[0].Status);
    }
}