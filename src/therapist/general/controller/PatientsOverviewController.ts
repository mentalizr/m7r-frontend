import * as Mustache from "mustache";
import {ModelTherapist} from "../model/ModelTherapist";

const ID_PATIENT_OVERVIEW_TEMPLATE = "patient-overview-template";
const ID_PATIENTS_OVERVIEW = "patients-overview";

export class PatientsOverviewController {

    public static initView() {
        PatientsOverviewController.render();
    }

    private static render() {
        const template = document.getElementById(ID_PATIENT_OVERVIEW_TEMPLATE).innerHTML;
        const rendered: string = Mustache.render(template, ModelTherapist.patientsOverview);
        document.getElementById(ID_PATIENTS_OVERVIEW).innerHTML = rendered;
    }
}