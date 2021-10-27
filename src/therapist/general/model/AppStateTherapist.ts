import {PatientMessages} from "../entities/PatientMessages";
import {PatientMessagesFetch} from "../fetch/PatientMessagesFetch";
import {Logger} from "../../../helper/Logger";
import {PatientOverview, PatientsOverview, PatientsOverviewHelper} from "../entities/PatientsOverview";
import {PatientsOverviewFetch} from "../fetch/PatientsOverviewFetch";

const STATE_OVERVIEW: number = 0;
const STATE_MESSAGES: number = 1;

export class AppStateTherapist {

    private static state: number;
    private static stateOverview: AppStateTherapistOverview;
    private static stateMessages: AppStateTherapistMessages;

    public static initialize() {
        AppStateTherapist.setStateOverview();
    }

    public static isStateOverview(): boolean {
        return AppStateTherapist.state == STATE_OVERVIEW;
    }

    public static isStateMessages(): boolean {
        return AppStateTherapist.state == STATE_MESSAGES;
    }

    public static setStateOverview() {
        AppStateTherapist.state = STATE_OVERVIEW;
        AppStateTherapist.stateOverview = new AppStateTherapistOverview();
        AppStateTherapist.stateOverview.patientsOverview = PatientsOverviewFetch.patientsOverview;
    }

    public static setStateMessages(userIdPatient: string) {
        AppStateTherapist.state = STATE_MESSAGES;
        AppStateTherapist.stateMessages = new AppStateTherapistMessages();
        AppStateTherapist.stateMessages.userIdPatient = userIdPatient;
        AppStateTherapist.stateMessages.patientMessages = PatientMessagesFetch.patientMessages;
    }

    public static getStateOverview(): AppStateTherapistOverview {
        if (!this.isStateOverview()) Logger("Not in state overview!");
        return AppStateTherapist.stateOverview;
    }

    public static getStateMessages(): AppStateTherapistMessages {
        if (!this.isStateMessages()) Logger("Not in state messages!");
        return AppStateTherapist.stateMessages;
    }

    public static getPatientOverviewForUser(userIdPatient: string): PatientOverview {
        return PatientsOverviewHelper.getPatientOverviewForUser(PatientsOverviewFetch.patientsOverview, userIdPatient);
    }

}

export class AppStateTherapistOverview {
    public patientsOverview: PatientsOverview;
}

export class AppStateTherapistMessages {
    public userIdPatient: string;
    public patientMessages: PatientMessages;
}