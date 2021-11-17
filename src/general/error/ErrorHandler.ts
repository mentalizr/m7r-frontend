import {GeneralAlertController} from "../../patient/content/generalAlert/GeneralAlertController";
import {TimeoutController} from "../../patient/general/controller/TimeoutController";
import {Logger} from "../../helper/Logger";
import {FetchResponseError} from "../../patient/content/mainContent/formDataPersist/rest/FetchResponseError";
import {ErrorController} from "../../patient/general/controller/ErrorController";
import {ModalTimeout} from "../timeout/ModalTimeout";
import {ModalError} from "./ModalError";
import {BackdropSpinnerController} from "../../patient/general/controller/BackdropSpinnerController";

export class ErrorHandler {

    public static handleError(error: Error): void {
        console.log("ErrorHandler invoked. error name: " + error.name + " error message: " + error.message + " stack: " + error.stack);

        if (error instanceof FetchResponseError) {
            Logger(error.message);

            if (error.getStatus() === 401) {
                BackdropSpinnerController.hide();
                ModalTimeout.show();
            } else {
                BackdropSpinnerController.hide();
                GeneralAlertController.showWithText("Es ist ein Fehler aufgetreten. Bitte prüfen Sie die Internetverbindung und versuchen Sie es erneut.");
            }
        } else {
            BackdropSpinnerController.hide();
            ModalError.show();
        }
    }

}