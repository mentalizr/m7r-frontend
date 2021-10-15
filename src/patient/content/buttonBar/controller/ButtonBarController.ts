import {Model} from "../../../general/model/Model";
import {ButtonBarView} from "../ButtonBarView";

export class ButtonBarController {

    public static updateView(): void {

        if (Model.getInfotextStatus().isInfotextDisplayed()) {
            ButtonBarView.disableNextButton();
            ButtonBarView.displayBackButton();
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

            if (Model.getProgramModel().hasAccessibleNextStep()) {
                ButtonBarView.displayNextButton();
            } else {
                ButtonBarView.disableNextButton();
            }

            if (Model.getProgramModel().hasPreviousStep()) {
                ButtonBarView.displayBackButton();
            } else {
                ButtonBarView.disableBackButton();
            }
        }
    }

    private static hasSavableContent(): boolean {
        if (Model.getProgramModel().isCurrentStepExercise()
            && Model.getStepModel().getFormDataModel().hasSentExercise())
            return false;

        // TODO check text fields marked as readonly
        return (Model.getStepModel().hasPersistableContent() && Model.getStepModel().isEditable());
    }

    private static hasSendableContent(): boolean {
        return Model.getProgramModel().isCurrentStepExercise()
            && !Model.getStepModel().getFormDataModel().hasSentExercise();
    }

}