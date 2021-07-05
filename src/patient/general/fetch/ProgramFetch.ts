import {Model} from "../model/Model";
import {SERVICE_BASE} from "../../../Globals";
import {FormDataFetchHelper} from "../../content/mainContent/formDataPersist/rest/FormDataFetchHelper";
import {RestResponse} from "../../../helper/RestResponse";

const SERVICE_NAME = "program";

export class ProgramFetch {

    public static execute() {

        const service: string = SERVICE_BASE + "/" + SERVICE_NAME;

        return fetch(service, {credentials: "include"})
            .then(ProgramFetch.status)
            .then(ProgramFetch.json)
            .then(ProgramFetch.updateModel);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        Model.initialize(data);
    }

}