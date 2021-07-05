import {SERVICE_BASE} from "../../../Globals";
import {FormDataFetchHelper} from "../../content/mainContent/formDataPersist/rest/FormDataFetchHelper";
import {RestResponse} from "../../../helper/RestResponse";

const SERVICE_NAME = "logout";

export class LogoutRest {

    public static execute() {

        const serviceUrl = SERVICE_BASE + "/" + SERVICE_NAME;

        return fetch(serviceUrl, {credentials: "include"})
            .then(LogoutRest.checkStatus);
    }

    private static checkStatus(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

}