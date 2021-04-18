using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Reflection;
using Chevin.API.Domain;
using Chevin.API.Enums;
using CsvHelper;

namespace Chevin.API.Data
{
    public static class DataRepository
    {
        public static IEnumerable<VehicleDetails> GetData()
        {
            var items = new List<VehicleDetails>();
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "Chevin.API.Data.Vehicle_Data.csv";
            var counter = 0;


            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                using (var reader = new StreamReader(stream))
                {
                    while (!reader.EndOfStream)
                    {
                        var line = reader.ReadLine();

                        if (counter > 0)
                        {
                            var values = line.Split(',');

                            if (values.Length == 20)
                            {
                                items.Add(new VehicleDetails
                                {
                                    Registration = values[DataMappingFile.Registration_number],
                                    Status = GetVehicleStatus(values[DataMappingFile.Vehicle_status]),
                                    Description = values[DataMappingFile.Vehicle_desc],
                                    MakeCode = values[DataMappingFile.Make_code],
                                    ModelCode = values[DataMappingFile.Model_code],
                                    BodyType = values[DataMappingFile.Body_type],
                                    OnFleetDate = GetNullableDateTimeValue(values[DataMappingFile.OnFleet_date]),
                                    CountryCode = values[DataMappingFile.Country_code],
                                    FuelType = GetFuelType(values[DataMappingFile.Fuel_type]),
                                    MPG = GetDoubleValue(values[DataMappingFile.MPG_UK]),
                                    CostPerMile = GetNullableDecimalValue(values[DataMappingFile.Cost_per_mile]),
                                    CostPerKM = GetNullableDecimalValue(values[DataMappingFile.Cost_per_km]),
                                    OdometerReading = GetIntValue(values[DataMappingFile.Odometer]),
                                    OdometerType = GetOdometerType(values[DataMappingFile.Odometer_type]),
                                    OdometerDate = GetNullableDateTimeValue(values[DataMappingFile.Odometer_date]),
                                    MOTDueDate = GetNullableDateTimeValue(values[DataMappingFile.MOT_date]),
                                    InsuranceDueDate = GetNullableDateTimeValue(values[DataMappingFile.Insurance_due_date]),
                                    TaxDueDate = GetNullableDateTimeValue(values[DataMappingFile.Tax_date]),
                                    DatePurchased = GetNullableDateTimeValue(values[DataMappingFile.Date_purchased]),
                                    DateRegistered = GetNullableDateTimeValue(values[DataMappingFile.Date_registered])
                                });
                            }
                        }

                        counter++;
                    }
                }
            }

            return items;
        }

        public static VehicleStatus GetVehicleStatus(string status)
        {
            switch (status.ToLower().Trim())
            {
                case "live on fleet":
                    return VehicleStatus.LiveOnFleet;
                case "awaiting disposal":
                    return VehicleStatus.AwaitingDisposal;
                case "pre-fleet":
                    return VehicleStatus.PreFleet;
                case "vor":
                    return VehicleStatus.VOR;
                default:
                    return VehicleStatus.Unknown;
            }
        }

        public static FuelType GetFuelType(string status)
        {
            switch (status.ToUpper().Trim())
            {
                case "DL":
                    return FuelType.DL;
                case "UL":
                    return FuelType.UL;
                case "ULP":
                    return FuelType.ULP;
                default:
                    return FuelType.Unknown;
            }
        }

        public static OdometerType GetOdometerType(string status)
        {
            switch (status.ToUpper().Trim())
            {
                case "K":
                    return OdometerType.K;
                case "M":
                    return OdometerType.M;
                default:
                    return OdometerType.Unknown;
            }
        }


        public static DateTime? GetNullableDateTimeValue(string value)
        {
            if (DateTime.TryParseExact(value, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime date))
            {
                return date;
            }

            return null;
        }

        public static int GetIntValue(string value)
        {
            if (int.TryParse(value, out int result))
            {
                return result;
            }

            return default;
        }

        public static double GetDoubleValue(string value)
        {
            if (double.TryParse(value, out double result))
            {
                return result;
            }

            return default;
        }

        public static decimal? GetNullableDecimalValue(string value)
        {
            if (decimal.TryParse(value, out decimal result))
            {
                return result;
            }

            return null;
        }

    }
}
