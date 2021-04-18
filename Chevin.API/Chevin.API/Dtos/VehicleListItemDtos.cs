using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chevin.API.Enums;

namespace Chevin.API.Dtos
{
    public class VehicleListItemDtos
    {
        public string Registration { get; set; }

        public VehicleStatus Status { get; set; }

        public string Description { get; set; }

        public FuelType FuelType { get; set; }

        public int OdometerReading { get; set; }

        public string CountryCode { get; set; }
    }
}