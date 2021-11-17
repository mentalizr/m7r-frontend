import {FormData} from "../../../model/formData/FormData";
import {SERVICE_BASE} from "../../../../../../Globals";
import {RestResponse} from "../../../../../../helper/RestResponse";
import {ErrorHandler} from "../../../../../../general/error/ErrorHandler";

const SERVICE_NAME = "patient/formData/save";

export class FormDataSaveService {

    public static execute(formData: FormData): Promise<unknown> {

        const formDataJSON: string = JSON.stringify(formData);
        const serviceUrl = SERVICE_BASE + "/" + SERVICE_NAME;

        console.log("FormDataSave serviceUrl: " + serviceUrl);
        console.log("formData: " + formDataJSON);

        return fetch(serviceUrl,
            {
                credentials: "include",
                method: "post",
                headers: {"Content-type": "application/json; charset=utf-8"},
                body: formDataJSON
            },
        )
            .then(FormDataSaveService.checkStatus)
            .catch(ErrorHandler.handleError);
    }

    private static checkStatus(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

}