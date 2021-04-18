using System.Collections.Generic;

namespace Chevin.API.Dtos
{
    public class VehicleListResponse
    {
        public IEnumerable<VehicleListItemDtos> Items { get; set; }
    }
}