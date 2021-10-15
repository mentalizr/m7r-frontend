import {ID_BACK_BUTTON, ID_NEXT_BUTTON, ID_SAVE_BUTTON, ID_SEND_BUTTON} from "./ButtonBarIDs";
import {Button} from "../../../helper/Button";

export class ButtonBarView {

    public static disableNextButton(): void {
        Button.disable(ID_NEXT_BUTTON);
    }

    public static displayNextButton(): void {
        Button.display(ID_NEXT_BUTTON);
    }

    public static disableBackButton(): void {
        Button.disable(ID_BACK_BUTTON);
    }

    public static displayBackButton(): void {
        Button.display(ID_BACK_BUTTON);
    }

    public static displaySaveButton(): void {
        Button.display(ID_SAVE_BUTTON);
    }

    public static hideSaveButton(): void {
        Button.hide(ID_SAVE_BUTTON);
    }

    public static displaySendButton(): void {
        Button.display(ID_SEND_BUTTON);
    }

    public static hideSendButton(): void {
        Button.hide(ID_SEND_BUTTON);
    }

}