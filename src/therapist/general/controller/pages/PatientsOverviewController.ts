import * as Mustache from "mustache";
import {PatientMessagesController} from "./PatientMessagesController";
import {TherapistAppController} from "../../../TherapistAppController";
import {NavbarTherapistController} from "../NavbarTherapistController";
import {PatientsOverview} from "../../entities/PatientsOverview";
import {AppStateTherapist} from "../../model/AppStateTherapist";
import {SplashController} from "../../../../general/controller/SplashController";

const ID_PATIENT_OVERVIEW_TEMPLATE = "patient-overview-template";
const ID_MAIN_CONTENT = "main-content";

export class PatientsOverviewController {

    public static initView() {
        TherapistAppController.cleanView();
        PatientsOverviewController.render();
        NavbarTherapistController.showRefreshButton();
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
        document.getElementById(ID_MAIN_CONTENT).innerHTML = Mustache.render(template, patientsOverview);
    }

    private static transitionToMessages(this: HTMLElement) {
        const userId = this.getAttribute("data-user-id");
        console.log("clicked ID: " + this.id);
        console.log("patientId: " + userId);
        SplashController.show();
        PatientMessagesController.initialize(userId).then(
            () => SplashController.hide()
        );
    }
}