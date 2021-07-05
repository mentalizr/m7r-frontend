import {SERVICE_BASE} from "../../../Globals";
import {Model} from "../model/Model";
import {FormDataFetchHelper} from "../../content/mainContent/formDataPersist/rest/FormDataFetchHelper";
import {RestResponse} from "../../../helper/RestResponse";

const SERVICE_NAME = "patient";


export class PatientFetch {

    public static execute() {

        const service: string = SERVICE_BASE + "/" + SERVICE_NAME;

        return fetch(service, {credentials: "include"})
            .then(PatientFetch.status)
            .then(PatientFetch.json)
            .then(PatientFetch.updateModel);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        Model.patient = data;
        // console.log("Patient: " + JSON.stringify(Model.patient));
    }

}