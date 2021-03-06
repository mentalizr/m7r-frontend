import {Model} from "../model/Model";
import {AppConfigPatient} from "../../appFrame/model/AppConfigPatient";
import {ID_TOPBAR_THERAPIST} from "../../../Globals";

const ID_THERAPEUT_LABEL = "therapeut-label";
const ID_THERAPEUT_NAME = "therapeut-name";

export class TherapistController {

    public static initView() {

        const appConfig: AppConfigPatient = Model.appConfigPatient;

        if (!appConfig.therapist) return;

        document.getElementById(ID_TOPBAR_THERAPIST).classList.remove("d-none");

        let label;
        if (Model.therapist.gender == 0) {
            label = "MEINE THERAPEUTIN:";
        } else {
            label = "MEIN THERAPEUT:"
        }

        document.getElementById(ID_THERAPEUT_LABEL).textContent = label;
        document.getElementById(ID_THERAPEUT_NAME).textContent = Model.therapist.displayName;

    }

}