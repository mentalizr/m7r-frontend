import {SERVICE_BASE} from "../../../Globals";
import {Model} from "../model/Model";
import {FormDataFetchHelper} from "../../content/mainContent/formDataPersist/rest/FormDataFetchHelper";
import {RestResponse} from "../../../helper/RestResponse";
import {ErrorHandler} from "../../../general/error/ErrorHandler";

const SERVICE_NAME = "user";


export class UserFetch {

    public static execute() {

        const service: string = SERVICE_BASE + "/" + SERVICE_NAME;

        return fetch(service, {credentials: "include"})
            .then(UserFetch.status)
            .then(UserFetch.json)
            .then(UserFetch.updateModel)
            .catch(ErrorHandler.handleError);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        Model.user = data;
        // console.log("User: " + JSON.stringify(Model.user));
    }

}