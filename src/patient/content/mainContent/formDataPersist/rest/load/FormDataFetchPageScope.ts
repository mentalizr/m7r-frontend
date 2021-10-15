import {SERVICE_BASE} from "../../../../../../Globals";
import {Model} from "../../../../../general/model/Model";
import {FormData} from "../../../model/formData/FormData";
import {FormDataFetchHelper} from "../FormDataFetchHelper";
import {ContentId} from "../ContentId";
import {RestResponse} from "../../../../../../helper/RestResponse";

const SERVICE_NAME = "formData";

export class FormDataFetchPageScope {

    public static execute(): Promise<unknown> {

        if (!FormDataFetchPageScope.hasInputElementsInScopePage()) {
            return Promise.resolve();
        }

        const serviceUrl = FormDataFetchPageScope.getServiceUrl();

        return fetch(serviceUrl, {credentials: "include"})
            .then(FormDataFetchPageScope.checkResponseStatus)
            .then(FormDataFetchPageScope.toJson)
            .then(FormDataFetchPageScope.updateModel);
    }

    private static getServiceUrl() {
        const contentId = FormDataFetchPageScope.getContentId();
        return SERVICE_BASE + "/" + SERVICE_NAME + "/" + contentId;
    }

    private static checkResponseStatus(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static toJson(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(formDataJson) {

        let formData: FormData = FormDataFetchPageScope.castJsonToFormData(formDataJson);

        if (FormDataFetchHelper.isEmpty(formData)) {
            formData = FormDataFetchHelper.createFormDataEnvelope(FormDataFetchPageScope.getContentId());
        }

        FormDataFetchPageScope.addToFormDataModel(formData);
    }

    private static castJsonToFormData(formDataJson) {
        return <FormData>formDataJson;
    }

    private static addToFormDataModel(formData: FormData) {
        Model.getStepModel().getFormDataModel().setInPageScope(formData);
    }

    private static getContentId(): string {
        return ContentId.forPageScope();
    }

    private static hasInputElementsInScopePage(): boolean {
        return Model.getStepModel().getInputElementsRegistry().hasElementsInScopePage();
    }

}