import {PatientOverview} from "../entities/PatientsOverview";
import {AppStateTherapist} from "../model/AppStateTherapist";
import {TherapistAppController} from "../../TherapistAppController";

const ID_NAVBAR_BACK = "navbar-back-arrow--link";
const ID_NAVBAR_REFRESH = "navbar-refresh--link";
const ID_NAVBAR_PATIENT_INITIALS = "navbar-patient-initials";
const ID_NAVBAR_PATIENT_DISPLAY_NAME = "navbar-patient-displayName";
const ID_NAVBAR_PATIENT_DISPLAY_NAME_TEXT = "navbar-patient-displayName-text";

export class NavbarTherapistController {

    public static registerUserEvents() {
        document.getElementById(ID_NAVBAR_BACK).addEventListener("click", function () {
            TherapistAppController.refreshAppTherapist(true)
                .then(r => console.log("Refresh overview after back button pressed."));
        })
        document.getElementById(ID_NAVBAR_REFRESH).addEventListener("click", function () {
            TherapistAppController.refreshAppTherapist(false)
                .then(r => console.log("Refresh overview after refresh button pressed."));
        })
    }

    public static showArrowBack() {
        document.getElementById(ID_NAVBAR_BACK).classList.remove("d-none");
    }

    public static hideArrowBack() {
        document.getElementById(ID_NAVBAR_BACK).classList.add("d-none");
    }

    public static showPatient(userIdPatient: string) {
        const patientOverview: PatientOverview = AppStateTherapist.getPatientOverviewForUser(userIdPatient);

        document.getElementById(ID_NAVBAR_PATIENT_INITIALS).classList.remove("d-none");
        document.getElementById(ID_NAVBAR_PATIENT_INITIALS).innerText = patientOverview.initials;

        document.getElementById(ID_NAVBAR_PATIENT_DISPLAY_NAME).classList.remove("d-none");
        document.getElementById(ID_NAVBAR_PATIENT_DISPLAY_NAME_TEXT).innerText = patientOverview.displayName;
    }

    public static hidePatient() {
        document.getElementById(ID_NAVBAR_PATIENT_INITIALS).classList.add("d-none");
        document.getElementById(ID_NAVBAR_PATIENT_INITIALS).innerText = "";

        document.getElementById(ID_NAVBAR_PATIENT_DISPLAY_NAME).classList.add("d-none");
        document.getElementById(ID_NAVBAR_PATIENT_DISPLAY_NAME_TEXT).innerText = "";
    }

}