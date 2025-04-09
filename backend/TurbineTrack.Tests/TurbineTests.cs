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
                // Countries
                new List<Country>
                {
                    new() { Id = 1, Name = "UK" },
                    new() { Id = 2, Name = "Germany" }
                },

                // Areas
                new List<Area>
                {
                    new() { Id = 1, Name = "Leicestershire", CountryId = 1 },
                    new() { Id = 2, Name = "Lower Saxony", CountryId = 2 }
                },

                // Turbines
                new List<Turbine>
                {
                    new() { Location = "Ashby Farm", Status = "Operational", PowerOutput = 145.5, WindSpeed = 9.3, AreaId = 1 },
                    new() { Location = "Nordwind Alpha", Status = "Operational", PowerOutput = 160.8, WindSpeed = 10.2, AreaId = 2 }
                }
            }
        };

    [Theory]
    [MemberData(nameof(TurbineSeedData))]
    public async Task Can_Add_And_Retrieve_Turbines_With_Area_And_Country(
        List<Country> countries,
        List<Area> areas,
        List<Turbine> turbines)
    {
        var options = new DbContextOptionsBuilder<TurbineContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        await using var context = new TurbineContext(options);

        context.Countries.AddRange(countries);
        context.Areas.AddRange(areas);
        context.Turbines.AddRange(turbines);

        await context.SaveChangesAsync();

        var result = await context.Turbines
            .Include(t => t.Area)
            .ThenInclude(a => a.Country)
            .OrderBy(t => t.Location)
            .ToListAsync();

        Assert.Equal(turbines.Count, result.Count);

        Assert.Collection(result,
            t =>
            {
                Assert.Equal("Ashby Farm", t.Location);
                Assert.Equal("Leicestershire", t.Area.Name);
                Assert.Equal("UK", t.Area.Country.Name);
            },
            t =>
            {
                Assert.Equal("Nordwind Alpha", t.Location);
                Assert.Equal("Lower Saxony", t.Area.Name);
                Assert.Equal("Germany", t.Area.Country.Name);
            });
    }
}

