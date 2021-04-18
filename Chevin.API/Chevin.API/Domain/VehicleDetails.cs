using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chevin.API.Enums;

namespace Chevin.API.Domain
{
    public class VehicleDetails
    {
        public string Registration { get; set; }

        public VehicleStatus Status { get; set; }

        public string Description { get; set; }

        public string MakeCode { get; set; }

        public string ModelCode { get; set; }

        public string BodyType { get; set; }

        public DateTime? OnFleetDate { get; set; }

        public string CountryCode { get; set; }

        public FuelType FuelType { get; set; }

        public double MPG { get; set; }

        public decimal? CostPerMile { get; set; }

        public decimal? CostPerKM { get; set; }

        public int OdometerReading { get; set; }

        public OdometerType OdometerType { get; set; }

        public DateTime? OdometerDate { get; set; }

        public DateTime? MOTDueDate { get; set; }

        public DateTime? InsuranceDueDate { get; set; }

        public DateTime? TaxDueDate { get; set; }

        public DateTime? DatePurchased { get; set; }

        public DateTime? DateRegistered { get; set; }
    }
}
