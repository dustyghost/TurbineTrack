using System.ComponentModel.DataAnnotations;

namespace TurbineTrack.Api.Models;

public class Turbine
{
    public int Id { get; init; }
        
    [MaxLength(255)]
    public required string Location { get; set; }
        
    [MaxLength(255)]
    public required string Status { get; set; }
    public double PowerOutput { get; set; }
    public double WindSpeed { get; set; }
    
    public int AreaId { get; set; }
    public Area Area { get; set; } = null!;
}
