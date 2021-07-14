import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";
import {Model} from "../model/Model";

const SERVICE_NAME = "patient/appConfig";

export class AppConfigPatientFetch {

    public static execute() {

        const service: string = SERVICE_BASE + "/" + SERVICE_NAME;

        return fetch(service, {credentials: "include"})
            .then(AppConfigPatientFetch.status)
            .then(AppConfigPatientFetch.json)
            .then(AppConfigPatientFetch.updateModel);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        Model.appConfigPatient = data;
        // console.log("AppConfig: " + JSON.stringify(Model.appConfig));
    }

}