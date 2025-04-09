using System.ComponentModel.DataAnnotations;

namespace TurbineTrack.Api.Models;

public class Country
{
    public int Id { get; set; }
    
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;
}

