import {ModalAlert} from "../../generator/modalAlert/ModalAlert";
import {Modal} from "../../helper/Modal";
import {ButtonBarControllerEvents} from "../../patient/content/buttonBar/controller/ButtonBarControllerEvents";
import {LogoutRest} from "../logout/LogoutRest";
import {Dispatcher} from "../../routing/Dispatcher";
import {FetchResponseError} from "../../patient/content/mainContent/formDataPersist/rest/FetchResponseError";
import {Logger} from "../../helper/Logger";
import {ErrorHandler} from "./ErrorHandler";
import {AppInitializer} from "../../application/AppInitializer";

const ID_ERROR_MODAL = "general-error--modal";
const ID_ERROR_CONFIRMED_BUTTON = "general-error-info--modal-link";

export class ModalError {

    public static create(): void {
        const modalSend: ModalAlert = new ModalAlert();

        modalSend.id = ID_ERROR_MODAL;
        modalSend.title = "Fehler.";
        modalSend.text = "Es ist ein Fehler aufgetreten. Bitte pr&uuml;fen Sie Ihre Internetverbindung und versuchen Sie es erneut."
        modalSend.buttonCancelLabel = undefined;
        modalSend.buttonConfirmId = ID_ERROR_CONFIRMED_BUTTON;
        modalSend.buttonConfirmLabel = "OK";

        modalSend.create();
    }

    public static show(): void {
        // TODO debug
        console.log("ModalError.show()");
        Modal.show(ID_ERROR_MODAL);
    }

    public static hide(): void {
        Modal.hide(ID_ERROR_MODAL);
    }

    public static registerConfirmedButton() {
        document.getElementById(ID_ERROR_CONFIRMED_BUTTON).addEventListener("click", function(event) {
            event.preventDefault();
            console.log("ErrorController: OK clicked!");
            Dispatcher.restart();
            // AppInitializer.start();
        });
    }

}