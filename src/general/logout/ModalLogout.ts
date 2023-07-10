import {ModalAlert} from "../../generator/modalAlert/ModalAlert";
import {Modal} from "../../helper/Modal";
import {ButtonBarControllerEvents} from "../../patient/content/buttonBar/controller/ButtonBarControllerEvents";
import {LogoutRest} from "./LogoutRest";
import {Dispatcher} from "../../routing/Dispatcher";
import {FetchResponseError} from "../../patient/content/mainContent/formDataPersist/rest/FetchResponseError";
import {Logger} from "../../helper/Logger";
import {ErrorHandler} from "../error/ErrorHandler";
import {EntryPoint} from "../../routing/EntryPointOptions/EntryPoint";
import {LogoutHelper} from "./LogoutHelper";

const ID_LOGOUT_MODAL = "logoutModal";
const ID_LOGOUT_CONFIRMED_BUTTON = "general-logout--link";

export class ModalLogout {

    public static create(): void {
        const modalSend: ModalAlert = new ModalAlert();

        modalSend.id = ID_LOGOUT_MODAL;
        modalSend.title = "Sitzung beenden?";
        modalSend.text = "Klicken Sie auf \"Logout\" um sich von Ihrer aktuellen Sitzung abzumelden."
        modalSend.buttonCancelLabel = "Abbrechen";
        modalSend.buttonConfirmId = ID_LOGOUT_CONFIRMED_BUTTON;
        modalSend.buttonConfirmLabel = "Logout";

        modalSend.create();
    }

    public static show(): void {
        Modal.show(ID_LOGOUT_MODAL);
    }

    public static hide(): void {
        Modal.hide(ID_LOGOUT_MODAL);
    }

    public static registerConfirmedButton() {
        document.getElementById(ID_LOGOUT_CONFIRMED_BUTTON).addEventListener("click", function(event) {
            event.preventDefault();
            LogoutHelper.logoutAndRestart();
        });
    }

}