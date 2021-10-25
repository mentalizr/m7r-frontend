import {FormDataFetchHelper} from "../FormDataFetchHelper";
import {FormData} from "../../../model/formData/FormData";
import {AbstractInputElement} from "../../../model/InputElementsRegistry/AbstractInputElement";
import {FormDataUpdater} from "../../FormDataUpdater";
import {FormDataSaveService} from "./FormDataSaveService";
import {ContentId} from "../ContentId";
import {Model} from "../../../../../general/model/Model";

export class FormDataSavePageScope {

    public static execute(): Promise<unknown> {
        if (FormDataSavePageScope.hasNoElementsInScopePage()) return Promise.resolve();
        let formData: FormData = FormDataSavePageScope.obtainFormDataFromView();
        FormDataSavePageScope.updateStepModel(formData);
        return FormDataSaveService.execute(formData);
    }

    private static hasNoElementsInScopePage() {
        return (!Model.getStepModel().getInputElementsRegistry().hasElementsInScopePage());
    }

    private static obtainFormDataFromView(): FormData {
        const inputElements: Set<AbstractInputElement> = FormDataSavePageScope.getPageScopeElements();

        let formData: FormData = FormDataSavePageScope.createFormDataEnvelope();
        formData = FormDataUpdater.refreshFormData(formData, inputElements);

        return formData;
    }

    private static getPageScopeElements(): Set<AbstractInputElement> {
        return Model.getStepModel().getInputElementsRegistry().getPageScopeElements();
    }

    private static createFormDataEnvelope(): FormData {
        const contentId: string = FormDataSavePageScope.getContentId();
        return FormDataFetchHelper.createFormDataEnvelope(contentId);
    }

    private static getContentId(): string {
        return ContentId.forPageScope();
    }

    private static updateStepModel(formData: FormData): void {
        Model.getStepModel().getFormDataModel().setInPageScope(formData);
    }

}