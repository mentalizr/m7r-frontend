import {FormDataFetchHelper} from "../FormDataFetchHelper";
import {FormData} from "../../../model/formData/FormData";
import {AbstractInputElement} from "../../../model/InputElementsRegistry/AbstractInputElement";
import {FormDataUpdater} from "../../FormDataUpdater";
import {ContentId} from "../ContentId";
import {FormDataSend} from "./FormDataSend";
import {Model} from "../../../../../general/model/Model";

export class FormDataSendPageScope {

    public static execute(): Promise<unknown> {

        if (FormDataSendPageScope.hasNoElementsInScopePage()) return Promise.resolve();

        let formData: FormData = FormDataSendPageScope.getFormData();

        return FormDataSend.execute(formData);
    }

    private static hasNoElementsInScopePage() {
        return (!Model.getStepModel().getInputElementsRegistry().hasElementsInScopePage());
    }

    private static getFormData(): FormData {
        const inputElements: Set<AbstractInputElement> = FormDataSendPageScope.getPageScopeElements();

        // TODO feedback rework: editable flag beachten!
        // Hier muss ein in der DB persistiertes Flag übernommen werden.
        let formData: FormData = FormDataSendPageScope.createFormDataEnvelope();
        return FormDataUpdater.refreshFormData(formData, inputElements);
    }

    private static getPageScopeElements(): Set<AbstractInputElement> {
        return Model.getStepModel().getInputElementsRegistry().getPageScopeElements();
    }

    private static createFormDataEnvelope(): FormData {
        const contentId: string = FormDataSendPageScope.getContentId();
        return FormDataFetchHelper.createFormDataEnvelope(contentId);
    }

    private static getContentId(): string {
        return ContentId.forPageScope();
    }
}