import {Model} from "../model/Model";

const ID_PATIENT_NAME = "patient-name";

export class PatientController {

    public static updateView() {
        document.getElementById(ID_PATIENT_NAME).textContent = Model.patient.name;
    }

}