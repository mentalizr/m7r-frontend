import {AppConfigTherapist} from "../entities/AppConfigTherapist";
import {PatientsOverview} from "../entities/PatientsOverview";

export class ModelTherapist {

    public static appConfigTherapist: AppConfigTherapist;
    public static patientsOverview: PatientsOverview;

    public static initialize(): void {
        // console.log("[Model]: initialize");
    }

}