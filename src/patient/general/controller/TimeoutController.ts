import {LogoutRest} from "../../../general/logout/LogoutRest";
import {FetchResponseError} from "../../content/mainContent/formDataPersist/rest/FetchResponseError";
import {Modal} from "../../../helper/Modal";
import {AppInitializer} from "../../../application/AppInitializer";

const ID_TIMEOUT_OK = "general-timeout-info--modal-link";
const ID_TIMEOUT_MODAL = "general-timeout--modal";

export class TimeoutController {

    // public static registerClick() {
    //
    //     let timeoutOkLink = document.getElementById(ID_TIMEOUT_OK);
    //     timeoutOkLink.addEventListener("click", function(event) {
    //
    //         event.preventDefault();
    //
    //         LogoutRest.execute()
    //             .catch(function(error: FetchResponseError) {
    //                 // din
    //             })
    //             .then(function() {
    //                 // location.reload();
    //                 AppInitializer.start();
    //             })
    //     })
    //
    // }

    // public static showTimoutModal() {
    //     Modal.show(ID_TIMEOUT_MODAL);
    // }

}