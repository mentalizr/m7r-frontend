import * as Mustache from "mustache";
import {ModelTherapist} from "../model/ModelTherapist";
import {ID_NEXT_BUTTON} from "../../../patient/content/buttonBar/ButtonBarIDs";
import {ButtonBarControllerEvents} from "../../../patient/content/buttonBar/controller/ButtonBarControllerEvents";
import ClickEvent = JQuery.ClickEvent;

const ID_PATIENT_OVERVIEW_TEMPLATE = "patient-overview-template";
const ID_PATIENTS_OVERVIEW = "patients-overview";

export class PatientsOverviewController {

    public static initView() {
        PatientsOverviewController.render();
    }

    public static registerEvents() {

        document.querySelectorAll('.m7r-patient-overview').forEach(item => {
            item.addEventListener("click", this.action, false);
        });

        // document.getElementById(ID_NEXT_BUTTON).addEventListener("click", function() {
        //     ButtonBarControllerEvents.actionContentNextButton();
        // });
    }

    private static render() {
        const template = document.getElementById(ID_PATIENT_OVERVIEW_TEMPLATE).innerHTML;
        const rendered: string = Mustache.render(template, ModelTherapist.patientsOverview);
        document.getElementById(ID_PATIENTS_OVERVIEW).innerHTML = rendered;
    }

    private static action(this: HTMLElement) {
        console.log("clicked ID: " + this.id);
        console.log("userId: " + this.getAttribute("data-user-id"));
    }
}