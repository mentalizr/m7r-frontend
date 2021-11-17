import {SERVICE_BASE} from "../../Globals";
import {RestResponse} from "../../helper/RestResponse";
import {ErrorHandler} from "../error/ErrorHandler";

const SERVICE_NAME = "logout";

export class LogoutRest {

    public static execute() {
        const serviceUrl = SERVICE_BASE + "/" + SERVICE_NAME;
        return fetch(serviceUrl, {credentials: "include"})
            .then(LogoutRest.checkStatus)
            .catch(ErrorHandler.handleError);
    }

    private static checkStatus(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

}