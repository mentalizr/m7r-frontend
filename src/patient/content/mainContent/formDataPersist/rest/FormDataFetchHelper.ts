import {FormData, FormElementDataList} from "../../model/formData/FormData";
import {Model} from "../../../../general/model/Model";

export class FormDataFetchHelper {

    // public static check(serviceName: string, response: Response): Promise<unknown> {
    //
    //     if (response.ok) {
    //         return Promise.resolve(response);
    //     } else {
    //         return Promise.reject(new FetchResponseError(serviceName, response.status, response.statusText));
    //     }
    // }

    // TODO Error-ReponseCode durch Service anstatt leeres Dokument
    public static isEmpty(formData: FormData): boolean {
        return formData.contentId === "";
    }

    public static createFormDataEnvelope(contentId: string): FormData {

        // TODO property editable: rework feedback

        let formData = <FormData>{};
        formData.userId = Model.user.userId;
        formData.contentId = contentId;
        formData.formElementDataList = new Array<FormElementDataList>();

        return formData;
    }

}