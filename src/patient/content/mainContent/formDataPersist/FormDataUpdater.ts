import {AbstractInputElement} from "../model/InputElementsRegistry/AbstractInputElement";
import {FormData, FormElementDataList} from "../model/formData/FormData";
import {Model} from "../../../general/model/Model";

export class FormDataUpdater {

    public static refreshFormData(formData: FormData, inputElementSet: Set<AbstractInputElement>): FormData {

        for (let inputElement of inputElementSet) {

            let formElementDataList = <FormElementDataList>{};
            formElementDataList.formElementId = inputElement.getRefId();
            formElementDataList.formElementType = inputElement.getTypeString();
            formElementDataList.formElementValue = inputElement.getValue();

            formData.formElementDataList.push(formElementDataList);
        }

        return formData;
    }

    public static refreshView(formData: FormData): void {

        const inputElementsRegistry = Model.getStepModel().getInputElementsRegistry();

        for (let formDataList of formData.formElementDataList) {

            const id: string = formDataList.formElementId;
            const value: string = formDataList.formElementValue;

            if (!inputElementsRegistry.hasElement(id)) continue;

            let abstractInputElements: Set<AbstractInputElement> = inputElementsRegistry.getAbstractInputElements(id);
            for (let abstractInputElement of abstractInputElements) {
                abstractInputElement.setValue(value);
            }
        }

    }

}
