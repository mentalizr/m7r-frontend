import {GeneralAlertController} from "../../content/generalAlert/GeneralAlertController";
import {TimeoutController} from "./TimeoutController";
import {Logger} from "../../../helper/Logger";
import {FetchResponseError} from "../../content/mainContent/formDataPersist/rest/FetchResponseError";
import {ErrorController} from "./ErrorController";

export class ErrorHandler {

    public static handleError(error: Error): void {

        if (error instanceof FetchResponseError) {
            Logger(error.message);

            if (error.getStatus() === 401) {
                TimeoutController.showTimoutModal();
            } else {
                GeneralAlertController.showWithText("Es ist ein Fehler aufgetreten. Bitte prüfen Sie die Internetverbindung und versuchen Sie es erneut.");
            }
        } else {
            ErrorController.showErrorModal();
            // GeneralAlertController.showWithText("Es ist ein Fehler aufgetreten. Bitte prüfen Sie die Internetverbindung und versuchen Sie es erneut.");
        }
    }

}