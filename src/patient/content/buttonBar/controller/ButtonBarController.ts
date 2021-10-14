import {Model} from "../../../general/model/Model";
import {ButtonBarView} from "../ButtonBarView";
import {StepModel} from "../../mainContent/model/StepModel";

export class ButtonBarController {

    public static updateView(): void {

        if (Model.infotextStatus.isInfotextDisplayed()) {
            ButtonBarView.disableNextButton();
            ButtonBarView.enableBackButton();
            ButtonBarView.hideSaveButton();
            ButtonBarView.hideSendButton();

        } else {
            if (this.hasSavableContent()) {
                ButtonBarView.displaySaveButton();
            } else {
                ButtonBarView.hideSaveButton();
            }

            if (this.hasSendableContent()) {
                ButtonBarView.displaySendButton();
            } else {
                ButtonBarView.hideSendButton();
            }

            if (Model.programStepper.hasAccessibleNextStep()) {
                ButtonBarView.enableNextButton();
            } else {
                ButtonBarView.disableNextButton();
            }

            if (Model.programStepper.hasPreviousStep()) {
                ButtonBarView.enableBackButton();
            } else {
                ButtonBarView.disableBackButton();
            }
        }
    }

    private static hasSavableContent(): boolean {
        return (StepModel.hasPersistableContent() && StepModel.isEditable());
    }

    private static hasSendableContent(): boolean {
        // TODO rework feedback
        return false;
        // return (StepModel.hasPersistableContent() && StepModel.isEditable());
    }

}