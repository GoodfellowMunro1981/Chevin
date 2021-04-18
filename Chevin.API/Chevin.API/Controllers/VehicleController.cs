using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chevin.API.Data;
using Chevin.API.Dtos;
using Chevin.API.Dtos.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Chevin.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class VehicleController
    {
        private readonly ILogger<VehicleController> _logger;

        public VehicleController(ILogger<VehicleController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public async Task<VehicleListResponse> GetVehicles()
        {
            var items = new List<VehicleListItemDtos>();

            try
            {
                foreach (var vehicleDetail in DataRepository.GetData())
                {
                    var vehicleListItem = new VehicleListItemDtos
                    {
                        Registration = vehicleDetail.Registration,
                        Status = vehicleDetail.Status,
                        Description = vehicleDetail.Description,
                        FuelType = vehicleDetail.FuelType,
                        OdometerReading = vehicleDetail.OdometerReading,
                        CountryCode = vehicleDetail.CountryCode,
                    };

                    items.Add(vehicleListItem);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Data failed to load");
            }

            return new VehicleListResponse
            {
                Items = items
            };
        }

        [HttpPost]
        public async Task<VehicleDetailsResponse> GetVehicleDetails([FromForm] VehicleDetailsRequest request)
        {
            var success = false;
            var vehicleDetails = new VehicleDetailsDtos();

            if (!string.IsNullOrEmpty(request.Registration))
            {
                try
                {
                    vehicleDetails = DataRepository.GetData()
                                    .Where(x => x.Registration.ToLower() == request.Registration.ToLower().Trim())
                                    .Select(x => new VehicleDetailsDtos
                                    {
                                        Registration = x.Registration,
                                        Status = x.Status,
                                        Description = x.Description,
                                        MakeCode = x.MakeCode,
                                        ModelCode = x.ModelCode,
                                        BodyType = x.BodyType,
                                        CountryCode = x.CountryCode,
                                        OnFleetDate = x.OnFleetDate,
                                        FuelType = x.FuelType,
                                        MPG = x.MPG,
                                        CostPerMile = x.CostPerMile,
                                        CostPerKM = x.CostPerKM,
                                        OdometerReading = x.OdometerReading,
                                        OdometerType = x.OdometerType,
                                        OdometerDate = x.OdometerDate,
                                        MOTDueDate = x.MOTDueDate,
                                        InsuranceDueDate = x.InsuranceDueDate,
                                        TaxDueDate = x.TaxDueDate,
                                        DatePurchased = x.DatePurchased,
                                        DateRegistered = x.DateRegistered
                                    })
                                    .FirstOrDefault();

                    if (vehicleDetails != null)
                    {
                        success = true;
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Data failed to load");
                }
            }

            return new VehicleDetailsResponse()
            {
                Success = success,
                VehicleDetails = vehicleDetails
            };
        }
    }
}