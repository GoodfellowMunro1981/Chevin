namespace Chevin.API.Dtos
{
    public class VehicleDetailsResponse
    {
        public bool Success { get; set; }

        public VehicleDetailsDtos VehicleDetails { get; set; }
    }
}