import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";
import {ModelTherapist} from "../model/ModelTherapist";

const SERVICE_NAME = "therapist/patientsOverview";

export class PatientsOverviewFetch {

    public static execute() {

        const service: string = SERVICE_BASE + "/" + SERVICE_NAME;

        return fetch(service, {credentials: "include"})
            .then(PatientsOverviewFetch.status)
            .then(PatientsOverviewFetch.json)
            .then(PatientsOverviewFetch.updateModel);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        ModelTherapist.patientsOverview = data;
        // TODO debug
        console.log("AppConfig: " + JSON.stringify(ModelTherapist.patientsOverview));
    }

}