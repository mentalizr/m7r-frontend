import {Modal} from "../../../helper/Modal";

const ID_GENERAL_LOADING_MODAL = "general-loading--modal";

// TODO rename id in html

export class BackdropSpinnerController {

    public static show() {
        Modal.showWithBackdrop(ID_GENERAL_LOADING_MODAL);
        document.querySelector(".modal-backdrop").classList.add("loading-modal-backdrop");
    }

    public static hide() {
        Modal.hide(ID_GENERAL_LOADING_MODAL);
    }

}