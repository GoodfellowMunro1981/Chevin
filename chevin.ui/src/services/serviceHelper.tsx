import { Configuration } from "../swagger/configuration";
import Constants from "../config/constants";

var GenerateOptions = async () => {
    var options = { headers: {} as any };
    return options;
}

var ApiConfig = new Configuration({
    basePath: Constants.apiEndpoint
});

export {
    ApiConfig,
    GenerateOptions
}