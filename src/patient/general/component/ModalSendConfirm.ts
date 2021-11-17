import {ModalAlert} from "../../../generator/modalAlert/ModalAlert";
import {Modal} from "../../../helper/Modal";
import {ButtonBarControllerEvents} from "../../content/buttonBar/controller/ButtonBarControllerEvents";

const ID_SEND_CONFIRM_MODAL = "content-send_confirm--modal";
const ID_SEND_CONFIRMED_BUTTON = "content-send_confirmed--button";

export class ModalSendConfirm {

    public static create(): void {
        const modalSend: ModalAlert = new ModalAlert();

        modalSend.id = ID_SEND_CONFIRM_MODAL;
        modalSend.title = "&Uuml;bung an Therapeuten senden?";
        modalSend.text = "Klicken Sie auf \"Senden\", um Ihre &Uuml;bung an Ihre Therapeutin bzw. Ihren Therapeuten zu " +
            "senden. Nach dem Senden k&ouml;nnen Sie die eingegebenen Daten nicht mehr &auml;ndern. " +
            "Klicken Sie auf \"Abbrechen\" um den Vorgang abzubrechen."
        modalSend.buttonCancelLabel = "Abbrechen";
        modalSend.buttonConfirmId = ID_SEND_CONFIRMED_BUTTON;
        modalSend.buttonConfirmLabel = "Senden";

        modalSend.create();
    }

    public static show(): void {
        Modal.show(ID_SEND_CONFIRM_MODAL);
    }

    public static hide(): void {
        Modal.hide(ID_SEND_CONFIRM_MODAL);
    }

    public static registerConfirmedButton() {
        document.getElementById(ID_SEND_CONFIRMED_BUTTON).addEventListener("click", function () {
            ButtonBarControllerEvents.actionContentSendConfirmedButton();
        });
    }

}