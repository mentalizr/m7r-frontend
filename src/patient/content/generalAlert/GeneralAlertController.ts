const ID_GENERAL_ALERT = "content-general--alert";

export class GeneralAlertController {

    public static showGenericError(): void {
        GeneralAlertController.showWithText("Es ist ein Fehler aufgetreten. Bitte prüfen Sie die Internetverbindung und versuchen Sie es erneut.");
    }

    public static showSaveError(): void {
        GeneralAlertController.showWithText("Beim Speichern ist ein Fehler aufgetreten. Bitte prüfen Sie die Internetverbindung und versuchen Sie es erneut.");
    }

    public static showSendError(): void {
        GeneralAlertController.showWithText("Beim Senden ist ein Fehler aufgetreten. Bitte prüfen Sie die Internetverbindung und versuchen Sie es erneut.");
    }

    public static showWithText(text: string): void {
        document.getElementById(ID_GENERAL_ALERT).textContent = text;
        GeneralAlertController.show();
    }

    public static show(): void {
        document.getElementById(ID_GENERAL_ALERT).classList.remove("d-none");
    }

    public static hide(): void {
        document.getElementById(ID_GENERAL_ALERT).classList.add("d-none");
    }

}