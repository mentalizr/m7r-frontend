import {ID_BACK_BUTTON, ID_NEXT_BUTTON, ID_SAVE_BUTTON, ID_SEND_BUTTON} from "../ButtonBarIDs";
import {Model} from "../../../general/model/Model";
import {FormDataValidator} from "../../mainContent/formDataPersist/FormDataValidator";
import {BackdropSpinnerController} from "../../../general/controller/BackdropSpinnerController";
import {FormDataSavePageScope} from "../../mainContent/formDataPersist/rest/save/FormDataSavePageScope";
import {FormDataSaveProgramGenericScope} from "../../mainContent/formDataPersist/rest/save/FormDataSaveProgramGenericScope";
import {FormDataSaveProgramNamedScope} from "../../mainContent/formDataPersist/rest/save/FormDataSaveProgramNamedScope";
import {GeneralAlertController} from "../../generalAlert/GeneralAlertController";
import {PatientAppController} from "../../../general/controller/PatientAppController";
import {FormDataSendPageScope} from "../../mainContent/formDataPersist/rest/save/FormDataSendPageScope";
import {ProgramFetch} from "../../../general/fetch/ProgramFetch";
import {ModalSendConfirm} from "../../../general/component/ModalSendConfirm";

export class ButtonBarControllerEvents {

    public static registerUserEvents(): void {

        document.getElementById(ID_NEXT_BUTTON).addEventListener("click", function() {
            ButtonBarControllerEvents.actionContentNextButton();
        });

        document.getElementById(ID_BACK_BUTTON).addEventListener("click", function() {
            ButtonBarControllerEvents.actionContentBackButton();
        });

        document.getElementById(ID_SAVE_BUTTON).addEventListener("click", function () {
            ButtonBarControllerEvents.actionContentSaveButton();
        });

        document.getElementById(ID_SEND_BUTTON).addEventListener("click", function () {
            ButtonBarControllerEvents.actionContentSendButton();
        });

        // SendConfirmModalController.registerConfirmedButton();
        ModalSendConfirm.registerConfirmedButton();
    }

    private static actionContentNextButton(): void {
        Model.getProgramModel().stepForward();
        PatientAppController.stepUpdate();
    }

    private static actionContentBackButton(): void {

        if (Model.getInfotextStatus().isInfotextDisplayed()) {
            ButtonBarControllerEvents.actionBackFromInfotextToLastStep();
        } else {
            ButtonBarControllerEvents.actionBackToPrevStep();
        }
    }

    private static actionBackFromInfotextToLastStep(): void {
        Model.getInfotextStatus().updateStatusInfotextNotDisplayed();
        PatientAppController.stepUpdate();
    }

    private static actionBackToPrevStep(): void {
        Model.getProgramModel().stepBackwards();
        PatientAppController.stepUpdate();
    }

    public static actionContentSaveButton(): void {
        // TODO rework feedback
        FormDataValidator.clearAllValidationMarks();

        BackdropSpinnerController.show();
        Promise.all([FormDataSavePageScope.execute(), FormDataSaveProgramGenericScope.execute(), FormDataSaveProgramNamedScope.execute()])
            .then(function() {
                BackdropSpinnerController.hide();
            });
    }

    public static actionContentSendButton(): void {
        // console.log("Send Button gedrückt.");
        let validationSuccess: boolean = FormDataValidator.validate();
        // console.log("ValidationSuccess: " + validationSuccess);

        if (!validationSuccess) {
            GeneralAlertController.showWithText("Bitte vervollständigen Sie zum Speichern Ihre Eingaben.");
        } else {
            // SendConfirmModalController.show();
            ModalSendConfirm.show();
        }
    }

    public static actionContentSendConfirmedButton(): void {
        // console.log("SendConfirmed Button gedrückt");
        // SendConfirmModalController.hide();
        ModalSendConfirm.hide();
        // FormDataSaver.send();
        const stepId: string = Model.getProgramModel().getCurrentStepId();
        FormDataSendPageScope.execute()
            .then(function() {
                return ProgramFetch.execute().then(function () {
                    return new Promise<void>((resolve, reject) => {
                        Model.getProgramModel().gotoStep(stepId);
                        resolve();
                    })

                });
            })
            .then(function() {
                PatientAppController.stepUpdate();
                // MainContentView.disableForm();
                // ButtonBarController.updateView();
            })
            // .catch(function() {
            //     GeneralAlertController.showSaveError();
            // })
            // .then(function() {
            //     BackdropSpinnerController.hide()
            // })
    }

}