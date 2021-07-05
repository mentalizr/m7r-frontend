import {ButtonBarControllerEvents} from "../../buttonBar/controller/ButtonBarControllerEvents";
import {Modal} from "../../../../helper/Modal";

const ID_SEND_CONFIRM_MODAL = "content-send_confirm--modal";
const ID_SEND_CONFIRMED_BUTTON = "content-send_confirmed--button";

export class SendConfirmModalController {

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