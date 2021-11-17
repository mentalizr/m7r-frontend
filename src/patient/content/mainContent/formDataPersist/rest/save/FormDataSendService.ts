import {FormData} from "../../../model/formData/FormData";
import {SERVICE_BASE} from "../../../../../../Globals";
import {RestResponse} from "../../../../../../helper/RestResponse";
import {ErrorHandler} from "../../../../../../general/error/ErrorHandler";

const SERVICE_NAME = "patient/formData/send";

export class FormDataSendService {

    public static execute(formData: FormData): Promise<unknown> {

        const formDataJSON: string = JSON.stringify(formData);
        const serviceUrl = SERVICE_BASE + "/" + SERVICE_NAME;

        // console.log("FormDataSend serviceUrl: " + serviceUrl);
        // console.log("formData: " + formDataJSON);

        return fetch(serviceUrl,
            {
                credentials: "include",
                method: "post",
                headers: {"Content-type": "application/json; charset=utf-8"},
                body: formDataJSON
            },
        )
            .then(FormDataSendService.checkStatus)
            .catch(ErrorHandler.handleError);
    }

    private static checkStatus(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

}