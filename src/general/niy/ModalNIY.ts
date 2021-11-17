import {ModalAlert} from "../../generator/modalAlert/ModalAlert";
import {Modal} from "../../helper/Modal";
import {ButtonBarControllerEvents} from "../../patient/content/buttonBar/controller/ButtonBarControllerEvents";
import {LogoutRest} from "../logout/LogoutRest";
import {Dispatcher} from "../../routing/Dispatcher";
import {FetchResponseError} from "../../patient/content/mainContent/formDataPersist/rest/FetchResponseError";
import {Logger} from "../../helper/Logger";
import {ErrorHandler} from "../error/ErrorHandler";
import {AppInitializer} from "../../application/AppInitializer";

const ID_NIY_MODAL = "general-niy--modal";
const ID_NIY_CONFIRMED_BUTTON = "general-niy--modal-button";

export class ModalNIY {

    public static create(): void {
        const modalSend: ModalAlert = new ModalAlert();

        modalSend.id = ID_NIY_MODAL;
        modalSend.title = "Not implemented yet.";
        modalSend.text = "Die ausgew&auml;hlte Funktionalit&auml;t ist noch nicht implementiert."
        modalSend.buttonCancelLabel = undefined;
        modalSend.buttonConfirmId = ID_NIY_CONFIRMED_BUTTON;
        modalSend.buttonConfirmLabel = "OK";

        modalSend.create();
    }

    public static show(): void {
        Modal.show(ID_NIY_MODAL);
    }

    public static hide(): void {
        Modal.hide(ID_NIY_MODAL);
    }

    public static registerConfirmedButton() {
        document.getElementById(ID_NIY_CONFIRMED_BUTTON)
            .addEventListener("click", function(event) {
                event.preventDefault();
                ModalNIY.hide();
            });
    }

}