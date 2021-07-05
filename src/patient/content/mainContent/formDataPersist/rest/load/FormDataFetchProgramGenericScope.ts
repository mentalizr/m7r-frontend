import {SERVICE_BASE} from "../../../../../../Globals";
import {FormData} from "../../../model/formData/FormData";
import {FormDataFetchHelper} from "../FormDataFetchHelper";
import {StepModel} from "../../../model/StepModel";
import {ContentId} from "../ContentId";
import {RestResponse} from "../../../../../../helper/RestResponse";

const SERVICE_NAME = "formData";

export class FormDataFetchProgramGenericScope {

    public static execute(): Promise<unknown> {

        if (!FormDataFetchProgramGenericScope.hasInputElementsInProgramGeneric()) {
            return Promise.resolve();
        }

        const serviceUrl = FormDataFetchProgramGenericScope.getServiceUrl();

        return fetch(serviceUrl, {credentials: "include"})
            .then(FormDataFetchProgramGenericScope.checkStatus)
            .then(FormDataFetchProgramGenericScope.toJson)
            .then(FormDataFetchProgramGenericScope.updateModel);
    }

    private static getServiceUrl() {
        const contentId = FormDataFetchProgramGenericScope.getContentId();
        return SERVICE_BASE + "/" + SERVICE_NAME + "/" + contentId;
    }

    private static checkStatus(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static toJson(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(formDataJson) {

        let formData: FormData = FormDataFetchProgramGenericScope.castJsonToFormData(formDataJson);

        if (FormDataFetchHelper.isEmpty(formData)) {
            formData = FormDataFetchHelper.createFormDataEnvelope(FormDataFetchProgramGenericScope.getContentId());
        }

        FormDataFetchProgramGenericScope.addToFormDataModel(formData);
    }

    private static addToFormDataModel(formData: FormData) {
        StepModel.getFormDataModel().setInProgramGenericScope(formData);
    }

    private static castJsonToFormData(data): FormData {
        let formData: FormData = <FormData>data;
        return formData;
    }

    private static hasInputElementsInProgramGeneric(): boolean {
        return StepModel.getInputElementsRegistry().hasElementsInScopeProgramGeneric();
    }

    private static getContentId(): string {
        return ContentId.forProgramGenericScope();
    }

}