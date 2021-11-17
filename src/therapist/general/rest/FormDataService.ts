import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";
import {FormData} from "../../../patient/content/mainContent/model/formData/FormData";
import {ErrorHandler} from "../../../general/error/ErrorHandler";

const SERVICE_NAME = "therapist/formData";

export class FormDataService {

    private static service: string = undefined;
    public static formData: FormData = undefined;

    public static execute(userId: string, contentId: string) {

        FormDataService.service = SERVICE_BASE + "/" + SERVICE_NAME + "/" + userId + "/" + contentId;

        return fetch(FormDataService.service, {credentials: "include"})
            .then(FormDataService.status)
            .then(FormDataService.json)
            .then(FormDataService.updateModel)
            .catch(ErrorHandler.handleError);
    }

    private static status(response) {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        FormDataService.formData = data;
    }

}
