import * as Mustache from "mustache";
import {ModelTherapist} from "../model/ModelTherapist";
import {ID_NEXT_BUTTON} from "../../../patient/content/buttonBar/ButtonBarIDs";
import {ButtonBarControllerEvents} from "../../../patient/content/buttonBar/controller/ButtonBarControllerEvents";
import ClickEvent = JQuery.ClickEvent;
import {PatientMessagesController} from "./PatientMessagesController";
import {Logger} from "../../../helper/Logger";
import {TherapistAppController} from "../../TherapistAppController";
import {NavbarTherapistController} from "./NavbarTherapistController";
import {PatientsOverview} from "../entities/PatientsOverview";
import {AppStateTherapist} from "../model/AppStateTherapist";

const ID_PATIENT_OVERVIEW_TEMPLATE = "patient-overview-template";
const ID_MAIN_CONTENT = "main-content";

export class PatientsOverviewController {

    public static initView() {
        TherapistAppController.cleanView();
        PatientsOverviewController.render();
        NavbarTherapistController.hideArrowBack();
        NavbarTherapistController.hidePatient();
    }

    public static registerEvents() {
        document.querySelectorAll('.m7r-patient-overview').forEach(item => {
            item.addEventListener("click", this.transitionToMessages, false);
        });
    }

    private static render() {
        const template = document.getElementById(ID_PATIENT_OVERVIEW_TEMPLATE).innerHTML;
        const patientsOverview: PatientsOverview = AppStateTherapist.getStateOverview().patientsOverview;
        const rendered: string = Mustache.render(template, patientsOverview);
        document.getElementById(ID_MAIN_CONTENT).innerHTML = rendered;
    }

    private static transitionToMessages(this: HTMLElement) {
        const userId = this.getAttribute("data-user-id");
        console.log("clicked ID: " + this.id);
        console.log("patientId: " + userId);
        PatientMessagesController.initialize(userId).then(
        //    r => Logger("PatientMessagesController initialized.")
        );
    }
}