import {ModalAlert} from "../../generator/modalAlert/ModalAlert";
import {Modal} from "../../helper/Modal";
import {ButtonBarControllerEvents} from "../../patient/content/buttonBar/controller/ButtonBarControllerEvents";
import {LogoutRest} from "../logout/LogoutRest";
import {Dispatcher} from "../../routing/Dispatcher";
import {FetchResponseError} from "../../patient/content/mainContent/formDataPersist/rest/FetchResponseError";
import {Logger} from "../../helper/Logger";
import {ErrorHandler} from "../error/ErrorHandler";
import {AppInitializer} from "../../application/AppInitializer";
import {LogoutHelper} from "../logout/LogoutHelper";

const ID_TIMEOUT_MODAL = "general-timeout--modal";
const ID_TIMEOUT_CONFIRMED_BUTTON = "general-timeout-info--modal-link";

export class ModalTimeout {

    public static create(): void {
        const modalSend: ModalAlert = new ModalAlert();

        modalSend.id = ID_TIMEOUT_MODAL;
        modalSend.title = "Timeout.";
        modalSend.text = "Aufgrund von Inaktivit&auml;t wurde die Sitzung beendet."
        modalSend.buttonCancelLabel = undefined;
        modalSend.buttonConfirmId = ID_TIMEOUT_CONFIRMED_BUTTON;
        modalSend.buttonConfirmLabel = "Logout";

        modalSend.create();
    }

    public static show(): void {
        // TODO debug
        console.log("show timeout modal");
        Modal.show(ID_TIMEOUT_MODAL);
    }

    public static hide(): void {
        Modal.hide(ID_TIMEOUT_MODAL);
    }

    public static registerConfirmedButton() {
        document.getElementById(ID_TIMEOUT_CONFIRMED_BUTTON)
            .addEventListener("click", function(event) {
                event.preventDefault();
                LogoutHelper.logoutAndRestart();
                // LogoutRest.execute()
                //     .catch(function(error: FetchResponseError) {
                //         // din
                //     })
                //     .then(function() {
                //         AppInitializer.start();
                //     });
            });
    }

}