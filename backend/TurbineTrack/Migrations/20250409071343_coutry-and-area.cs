using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurbineTrack.Api.Migrations
{
    /// <inheritdoc />
    public partial class coutryandarea : Migration
    {
        private static readonly string[] columns = new[] { "Location", "Status", "PowerOutput", "WindSpeed", "Country", "Area" };

        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Area",
                table: "Turbines",
                type: "TEXT",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Turbines",
                type: "TEXT",
                maxLength: 255,
                nullable: false,
                defaultValue: "");
            
            // Seed initial regional turbines
            migrationBuilder.InsertData(
                table: "Turbines",
                columns: columns,
                values: new object[,]
                {
                    { "Ashby Farm", "Operational", 145.5, 9.3, "UK", "Leicestershire" },
                    { "Derwent Rise", "Maintenance", 0.0, 6.1, "UK", "Derbyshire" },
                    { "Beacon Hill", "Operational", 180.0, 11.4, "UK", "Loughborough" },
                    { "Trent View", "Offline", 0.0, 4.7, "UK", "Nottinghamshire" },
                    { "Nordwind Alpha", "Operational", 160.8, 10.2, "Germany", "Lower Saxony" },
                    { "Fjordturnen", "Operational", 170.1, 13.5, "Norway", "Rogaland" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Area",
                table: "Turbines");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Turbines");
        }
    }
}
