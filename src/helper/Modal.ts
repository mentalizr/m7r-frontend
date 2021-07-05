import * as $ from "jquery";
import 'bootstrap';

export class Modal {

    public static show(id: string): void {
        $("#" + id).modal("show");
    }

    public static hide(id: string): void {
        $("#" + id).modal("hide");

        // siehe: https://stackoverflow.com/questions/46577690/hide-bootstrap-modal-using-pure-javascript-on-click/52570205
        // funktioniert leider nicht, da der Backdrop unberücksichtigt bleibt
        // let modal: HTMLElement = document.getElementById(id);
        // modal.classList.remove("show");
        // modal.setAttribute("aria-hidden", "true");
        // modal.setAttribute("style", "display: none");
    }

    public static showWithBackdrop(id: string): void {
        $("#" + id).modal({
            backdrop: "static",
            keyboard: false
        }).modal('show');
    }
}