import {SERVICE_BASE} from "../../../Globals";
import {Model} from "../model/Model";
import {FormDataFetchHelper} from "../../content/mainContent/formDataPersist/rest/FormDataFetchHelper";
import {RestResponse} from "../../../helper/RestResponse";
import {ErrorHandler} from "../../../general/error/ErrorHandler";

const SERVICE_NAME = "patient/therapist";

export class TherapistFetch {

    public static execute() {

        const service: string = SERVICE_BASE + "/" + SERVICE_NAME;

        return fetch(service, {credentials: "include"})
            .then(TherapistFetch.status)
            .then(TherapistFetch.json)
            .then(TherapistFetch.updateModel)
            .catch(ErrorHandler.handleError);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        Model.therapist = data;
        // console.log("therapist: " + JSON.stringify(Model.threrapeut));
    }

}