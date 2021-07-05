import {StepModel} from "../../../model/StepModel";
import {FormDataFetchHelper} from "../FormDataFetchHelper";
import {FormData} from "../../../model/formData/FormData";
import {AbstractInputElement} from "../../../model/InputElementsRegistry/AbstractInputElement";
import {FormDataUpdater} from "../../FormDataUpdater";
import {FormDataSave} from "./FormDataSave";
import {ContentId} from "../ContentId";
import {FormDataSavePageScope} from "./FormDataSavePageScope";
import {FormDataSend} from "./FormDataSend";

export class FormDataSendPageScope {

    public static execute(): Promise<unknown> {

        if (FormDataSendPageScope.hasNoElementsInScopePage()) return Promise.resolve();

        let formData: FormData = FormDataSendPageScope.getFormData();

        return FormDataSend.execute(formData);
    }

    private static hasNoElementsInScopePage() {
        return (!StepModel.getInputElementsRegistry().hasElementsInScopePage());
    }

    private static getFormData(): FormData {
        const inputElements: Set<AbstractInputElement> = FormDataSendPageScope.getPageScopeElements();

        // TODO feedback rework: editable flag beachten!
        // Hier muss ein in der DB persistiertes Flag übernommen werden.
        let formData: FormData = FormDataSendPageScope.createFormDataEnvelope();
        return FormDataUpdater.refreshFormData(formData, inputElements);
    }

    private static getPageScopeElements(): Set<AbstractInputElement> {
        return StepModel.getInputElementsRegistry().getPageScopeElements();
    }

    private static createFormDataEnvelope(): FormData {
        const contentId: string = FormDataSendPageScope.getContentId();
        return FormDataFetchHelper.createFormDataEnvelope(contentId);
    }

    private static getContentId(): string {
        return ContentId.forPageScope();
    }
}