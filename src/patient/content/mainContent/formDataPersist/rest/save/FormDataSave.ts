import {FormData} from "../../../model/formData/FormData";
import {SERVICE_BASE} from "../../../../../../Globals";
import {FormDataFetchHelper} from "../FormDataFetchHelper";
import {RestResponse} from "../../../../../../helper/RestResponse";

const SERVICE_NAME = "saveFormData";

export class FormDataSave {

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
            .then(FormDataSave.checkStatus);
    }

    private static checkStatus(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

}