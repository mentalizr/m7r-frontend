import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";
import {ModelTherapist} from "../model/ModelTherapist";
import {ErrorHandler} from "../../../general/error/ErrorHandler";

const SERVICE_NAME = "therapist/appConfig";

export class AppConfigTherapistService {

    public static execute() {

        const service: string = SERVICE_BASE + "/" + SERVICE_NAME;

        return fetch(service, {credentials: "include"})
            .then(AppConfigTherapistService.status)
            .then(AppConfigTherapistService.json)
            .then(AppConfigTherapistService.updateModel)
            .catch(ErrorHandler.handleError);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        ModelTherapist.appConfigTherapist = data;
        // console.log("AppConfig: " + JSON.stringify(Model.appConfig));
    }

}