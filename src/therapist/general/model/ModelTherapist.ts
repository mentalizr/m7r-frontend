import {AppConfigTherapist} from "../entities/AppConfigTherapist";
import {PatientsOverview} from "../entities/PatientsOverview";
import {PatientMessages} from "../entities/PatientMessages";

export class ModelTherapist {

    public static appConfigTherapist: AppConfigTherapist;
    public static patientsOverview: PatientsOverview;
    public static patientMessages: PatientMessages;

    public static initialize(): void {
        // console.log("[Model]: initialize");
    }

}