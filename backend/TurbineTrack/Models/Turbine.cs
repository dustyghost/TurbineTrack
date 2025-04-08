namespace TurbineTrack.Api.Models
{
    public class Turbine
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public double PowerOutput { get; set; }
        public double WindSpeed { get; set; }
    }
}