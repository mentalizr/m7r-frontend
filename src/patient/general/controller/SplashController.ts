import {Modal} from "../../../helper/Modal";

const ID_GENERAL_LOADING_MODAL = "general-splash--modal";


export class SplashController {

    public static show() {
        Modal.showWithBackdrop(ID_GENERAL_LOADING_MODAL);
        // $("#" + ID_GENERAL_LOADING_MODAL).modal({
        //     backdrop: "static",
        //     keyboard: false
        // }).modal('show');
    }

    public static hide() {
        Modal.hide(ID_GENERAL_LOADING_MODAL);
        // $("#" + ID_GENERAL_LOADING_MODAL).modal('hide');
    }


}