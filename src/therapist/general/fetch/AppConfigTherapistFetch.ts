import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";
import {ModelTherapist} from "../model/ModelTherapist";

const SERVICE_NAME = "therapist/appConfig";

export class AppConfigTherapistFetch {

    public static execute() {

        const service: string = SERVICE_BASE + "/" + SERVICE_NAME;

        return fetch(service, {credentials: "include"})
            .then(AppConfigTherapistFetch.status)
            .then(AppConfigTherapistFetch.json)
            .then(AppConfigTherapistFetch.updateModel);
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