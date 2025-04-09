using System.ComponentModel.DataAnnotations;

namespace TurbineTrack.Api.Models;

public class Area
{
    public int Id { get; set; }
    
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;

    public int CountryId { get; set; }
    public Country Country { get; set; } = null!;
}

