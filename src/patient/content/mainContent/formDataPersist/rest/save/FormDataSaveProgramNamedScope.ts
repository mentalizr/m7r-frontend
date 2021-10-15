import {StepModel} from "../../../model/StepModel";
import {AbstractInputElement} from "../../../model/InputElementsRegistry/AbstractInputElement";
import {FormDataSave} from "./FormDataSave";
import {FormData} from "../../../model/formData/FormData";
import {FormDataUpdater} from "../../FormDataUpdater";
import {FormDataFetchHelper} from "../FormDataFetchHelper";
import {ContentId} from "../ContentId";
import {Model} from "../../../../../general/model/Model";

export class FormDataSaveProgramNamedScope {

    public static execute(): Promise<unknown> {

        const programScopeIds: Array<string> = Model.getStepModel().getAllProgramScopeIds();

        let savePromises: Array<Promise<unknown>>
            = FormDataSaveProgramNamedScope.buildArrayOfSavePromises(programScopeIds);

        return Promise.all(savePromises);
    }


    private static buildArrayOfSavePromises(programScopeIds: Array<string>): Array<Promise<unknown>> {

        let savePromises: Array<Promise<unknown>> = [];
        for (let programScopeId of programScopeIds) {

            const formData: FormData = FormDataSaveProgramNamedScope.getFormData(programScopeId);

            savePromises.push(
                FormDataSave.execute(formData)
            );
        }
        return savePromises;
    }

    private static getFormData(programScopeId: string): FormData {
        const inputElements: Set<AbstractInputElement> = FormDataSaveProgramNamedScope.getElementsInProgramNamedScope(programScopeId);
        let formData: FormData = FormDataSaveProgramNamedScope.createFormDataEnvelope(programScopeId);
        return FormDataUpdater.refreshFormData(formData, inputElements);
    }

    private static getElementsInProgramNamedScope(scopeId: string): Set<AbstractInputElement> {
        return Model.getStepModel().getInputElementsRegistry().getProgramNamedScopeElements().getElementsForScopeId(scopeId);
    }

    private static createFormDataEnvelope(scopeId: string): FormData {
        const contentId: string = ContentId.forProgramNamedScope(scopeId);
        return FormDataFetchHelper.createFormDataEnvelope(contentId);
    }

}