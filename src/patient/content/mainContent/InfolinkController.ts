import {Model} from "../../general/model/Model";
import {ID_MAIN_CONTENT} from "../../../Globals";
import {ErrorHandler} from "../../general/controller/ErrorHandler";
import {PatientAppController} from "../../general/controller/PatientAppController";

const CLASS_INFOLINK = "infolink";

export class InfolinkController {

    public static registerClickEvent(): void {

        const selector: string = "#" + ID_MAIN_CONTENT + " ." + CLASS_INFOLINK;

        let infoLinks: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(selector);

        infoLinks.forEach(function (element) {

            element.addEventListener("click", function (event) {
                event.preventDefault();
                const linkId = this.id;
                const infotextId = Model.infotextStatus.getInfotextIdForLinkId(linkId);
                InfolinkController.actionInfolinkClicked(infotextId);
            });
        });
    }

    private static actionInfolinkClicked(infotextId): void {
        Model.infotextStatus.updateStatusInfotextIsDisplayed(infotextId);
        PatientAppController.stepUpdate();
    }

}