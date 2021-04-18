import { ApiConfig, GenerateOptions } from './serviceHelper';
import { VehicleApi, VehicleDetailsResponse, VehicleListResponse, } from '../swagger/';
import { showUserException } from './helpers/userException';

class VehicleService {

    async GetVehicles(): Promise<VehicleListResponse | null> {
        let api = new VehicleApi(ApiConfig);

        try {
            return api.apiVehicleGetVehiclesPost(await GenerateOptions());
        }
        catch (e) {
            await showUserException(e);
            return null;
        }
    }

    async GetVehicleDetails(registration: string): Promise<VehicleDetailsResponse> {
        let api = new VehicleApi(ApiConfig);
        return api.apiVehicleGetVehicleDetailsPost(registration, await GenerateOptions());
    }
}

export default new VehicleService;