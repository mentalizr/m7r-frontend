import {FormDataFetchHelper} from "../FormDataFetchHelper";
import {Exercise, FormData} from "../../../model/formData/FormData";
import {AbstractInputElement} from "../../../model/InputElementsRegistry/AbstractInputElement";
import {FormDataUpdater} from "../../FormDataUpdater";
import {ContentId} from "../ContentId";
import {FormDataSendService} from "./FormDataSendService";
import {Model} from "../../../../../general/model/Model";

export class FormDataSendPageScope {

    public static execute(): Promise<unknown> {

        if (FormDataSendPageScope.hasNoElementsInScopePage()) return Promise.resolve();

        let formData: FormData = FormDataSendPageScope.getFormData();

        return FormDataSendService.execute(formData);
    }

    private static hasNoElementsInScopePage() {
        return (!Model.getStepModel().getInputElementsRegistry().hasElementsInScopePage());
    }

    private static getFormData(): FormData {
        const inputElements: Set<AbstractInputElement> = FormDataSendPageScope.getPageScopeElements();

        let formData: FormData = FormDataSendPageScope.createFormDataEnvelope();
        formData = FormDataUpdater.refreshFormData(formData, inputElements);

        // TODO Exercise Subdocument beim Senden serverseitig erzeugen, dann exercise.sent property entfernen
        formData.exercise = <Exercise> {};
        formData.exercise.lastModifiedTimestamp = new Date(0).toISOString();
        formData.exercise.seenByTherapist = false;
        formData.exercise.seenByTherapistTimestamp = new Date(0).toISOString();
        formData.exercise.sent = false;

        return formData;
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