import {SERVICE_BASE} from "../../../../../../Globals";
import {Model} from "../../../../../general/model/Model";
import {FormData} from "../../../model/formData/FormData";
import {FormDataFetchHelper} from "../FormDataFetchHelper";
import {ContentId} from "../ContentId";
import {RestResponse} from "../../../../../../helper/RestResponse";
import {ErrorHandler} from "../../../../../../general/error/ErrorHandler";

const SERVICE_NAME = "patient/formData";

export class FormDataFetchPageScopePreviousPage {

    public static execute(): Promise<unknown> {

        if (!Model.getProgramModel().isCurrentStepFeedback())
            return Promise.resolve();

        const serviceUrl = FormDataFetchPageScopePreviousPage.getServiceUrl();

        return fetch(serviceUrl, {credentials: "include"})
            .then(FormDataFetchPageScopePreviousPage.checkResponseStatus)
            .then(FormDataFetchPageScopePreviousPage.toJson)
            .then(FormDataFetchPageScopePreviousPage.updateModel)
            .catch(ErrorHandler.handleError);
    }

    private static getServiceUrl() {
        const contentId = FormDataFetchPageScopePreviousPage.getContentId();
        return SERVICE_BASE + "/" + SERVICE_NAME + "/" + contentId;
    }

    private static checkResponseStatus(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static toJson(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(formDataJson) {

        // TODO better?
        let formData: FormData = FormDataFetchPageScopePreviousPage.castJsonToFormData(formDataJson);

        if (FormDataFetchHelper.isEmpty(formData)) {
            formData = FormDataFetchHelper.createFormDataEnvelope(FormDataFetchPageScopePreviousPage.getContentId());
        }

        FormDataFetchPageScopePreviousPage.addToFormDataModel(formData);
    }

    private static castJsonToFormData(formDataJson) {
        return <FormData>formDataJson;
    }

    private static addToFormDataModel(formData: FormData) {
        Model.getStepModel().getFormDataModel().setInPageScopePreviousStep(formData);
    }

    private static getContentId(): string {
        return ContentId.forPageScopePreviousStep();
    }

}