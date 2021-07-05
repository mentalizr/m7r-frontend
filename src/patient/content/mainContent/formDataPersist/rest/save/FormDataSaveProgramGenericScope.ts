import {StepModel} from "../../../model/StepModel";
import {FormDataFetchHelper} from "../FormDataFetchHelper";
import {Model} from "../../../../../general/model/Model";
import {FormData} from "../../../model/formData/FormData";
import {AbstractInputElement} from "../../../model/InputElementsRegistry/AbstractInputElement";
import {FormDataUpdater} from "../../FormDataUpdater";
import {FormDataSave} from "./FormDataSave";
import {ContentId} from "../ContentId";

export class FormDataSaveProgramGenericScope {

    public static execute(): Promise<unknown> {

        if (FormDataSaveProgramGenericScope.hasNoElementsInScopeProgramGeneric()) return Promise.resolve();

        let formData: FormData = FormDataSaveProgramGenericScope.getFormData();

        return FormDataSave.execute(formData);
    }

    private static hasNoElementsInScopeProgramGeneric() {
        return (!StepModel.getInputElementsRegistry().hasElementsInScopeProgramGeneric());
    }

    private static getFormData(): FormData {
        const inputElements: Set<AbstractInputElement> = FormDataSaveProgramGenericScope.getElementsInScopeProgramGeneric();
        let formData: FormData = FormDataSaveProgramGenericScope.createFormDataEnvelope();
        return FormDataUpdater.refreshFormData(formData, inputElements);
    }

    private static getElementsInScopeProgramGeneric(): Set<AbstractInputElement> {
        return StepModel.getInputElementsRegistry().getProgramGenericScopeElements();
    }

    private static createFormDataEnvelope(): FormData {
        const contentId: string = ContentId.forProgramGenericScope();
        return FormDataFetchHelper.createFormDataEnvelope(contentId);
    }

}