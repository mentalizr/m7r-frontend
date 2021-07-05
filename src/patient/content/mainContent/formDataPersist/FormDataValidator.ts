import {CSS_CLASS_NS_INPUT} from "../../../../Globals";
import {GeneralAlertController} from "../../generalAlert/GeneralAlertController";
import {MainContentView} from "../MainContentView";

export class FormDataValidator {

    public static validate(): boolean {

        this.clearAllValidationMarks();

        let validationSuccessInputFields: boolean = this.processTextInputFields();
        let validationSuccessRadioButtons: boolean = this.processRadioButtons();

        return (validationSuccessInputFields && validationSuccessRadioButtons);
    }

    public static clearAllValidationMarks(): void {

        MainContentView.clearAllValidationMarksOnInputFields();
        GeneralAlertController.hide();
    }

    private static processTextInputFields(): boolean {

        // console.log("Text-Input:");

        // TODO rework feedback
        // let formElements = $("#" + ID_MAIN_CONTENT).find("." + CSS_CLASS_NS_INPUT);
        let formElements: NodeListOf<HTMLInputElement> = document.querySelectorAll("." + CSS_CLASS_NS_INPUT);

        return FormDataValidator.validateInputValues(formElements);
    }

    private static processRadioButtons(): boolean {

        // console.log("Radio-Buttons:");

        let validationResult: boolean = true;

        let radioGroupsNotChecked: Set<HTMLElement> = MainContentView.selectAllRadioGroupsWhichNotChecked();
        for (let radioGroupNotChecked of radioGroupsNotChecked) {
            validationResult = false;
            const id = radioGroupNotChecked.id;
            MainContentView.markAllButtonsAsInvalidForButtongroupId(id);
        }

        // for (let i=0; i<radioGroupsNotChecked.length; i++) {
        //     validationResult = false;
        //     const id = radioGroupsNotChecked[i].id;
        //     MainContentView.markAllButtonsAsInvalidForButtongroupId(id);
        // }

        return validationResult;
    }

    private static validateInputValues(formElements: NodeListOf<HTMLInputElement>): boolean {

        let validationResult: boolean = true;

        formElements.forEach(function (htmlInputElement) {
            const id = htmlInputElement.id;
            // const value = <string>$("#" + id).val();
            const value = htmlInputElement.value;
            // console.log("ID: " + id + " Value: " + value + " Type: " + formElementType);

            if (value == null || value == "") {
                validationResult = false;
                MainContentView.markTextfieldAsInvalid(id);
            }

        });

        // for (let i=0; i<formElements.length; i++) {
        //
        //     const id = formElements[i].id;
        //     // const value = <string>$("#" + id).val();
        //     const value = document.getElementById(id).va;
        //     // console.log("ID: " + id + " Value: " + value + " Type: " + formElementType);
        //
        //     if (value == null || value == "") {
        //         validationResult = false;
        //         MainContentView.markTextfieldAsInvalid(id);
        //     }
        // }

        return validationResult;
    }

}