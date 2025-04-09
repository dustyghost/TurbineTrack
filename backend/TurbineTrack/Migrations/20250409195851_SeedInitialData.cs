using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurbineTrack.Api.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "UK" },
                    { 2, "Germany" },
                    { 3, "Norway" }
                });
            
            migrationBuilder.InsertData(
                table: "Areas",
                columns: new[] { "Id", "Name", "CountryId" },
                values: new object[,]
                {
                    { 1, "Leicestershire", 1 },
                    { 2, "Derbyshire", 1 },
                    { 3, "Loughborough", 1 },
                    { 4, "Nottinghamshire", 1 },
                    { 5, "Lower Saxony", 2 },
                    { 6, "Rogaland", 3 }
                });

            migrationBuilder.InsertData(
                table: "Turbines",
                columns: new[] { "Id", "Location", "Status", "PowerOutput", "WindSpeed", "AreaId" },
                values: new object[,]
                {
                    { 1, "Ashby Farm", "Operational", 145.5, 9.3, 1 },
                    { 2, "Derwent Rise", "Maintenance", 0.0, 6.1, 2 },
                    { 3, "Beacon Hill", "Operational", 180.0, 11.4, 3 },
                    { 4, "Trent View", "Offline", 0.0, 4.7, 4 },
                    { 5, "Nordwind Alpha", "Operational", 160.8, 10.2, 5 },
                    { 6, "Fjordturnen", "Operational", 170.1, 13.5, 6 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Delete Turbines first (FK to Areas)
            migrationBuilder.DeleteData(
                table: "Turbines",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3, 4, 5, 6 });

            // Then delete Areas (FK to Countries)
            migrationBuilder.DeleteData(
                table: "Areas",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3, 4, 5, 6 });

            // Finally delete Countries
            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3 });
        }
    }
}
