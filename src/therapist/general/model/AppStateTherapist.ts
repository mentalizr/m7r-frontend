import {PatientMessages} from "../entities/PatientMessages";
import {PatientMessagesService} from "../rest/PatientMessagesService";
import {PatientOverview, PatientsOverview, PatientsOverviewHelper} from "../entities/PatientsOverview";
import {PatientsOverviewService} from "../rest/PatientsOverviewService";

const STATE_OVERVIEW: number = 0;
const STATE_MESSAGES: number = 1;
const STATE_VIEW_EXERCISE: number = 2;

export class AppStateTherapist {

    private static state: number;
    private static stateOverview: AppStateTherapistOverview;
    private static stateMessages: AppStateTherapistMessages;
    private static stateViewExercise: AppStateViewExercise;

    public static initialize() {
        AppStateTherapist.setStateOverview();
    }

    public static isStateOverview(): boolean {
        return AppStateTherapist.state == STATE_OVERVIEW;
    }

    public static isStateMessages(): boolean {
        return AppStateTherapist.state == STATE_MESSAGES;
    }

    public static isStateViewExercise(): boolean {
        return AppStateTherapist.state == STATE_VIEW_EXERCISE;
    }

    public static setStateOverview() {
        AppStateTherapist.state = STATE_OVERVIEW;
        AppStateTherapist.stateOverview = new AppStateTherapistOverview();
        AppStateTherapist.stateOverview.patientsOverview = PatientsOverviewService.patientsOverview;
    }

    public static setStateMessages(userIdPatient: string) {
        AppStateTherapist.state = STATE_MESSAGES;
        AppStateTherapist.stateMessages = new AppStateTherapistMessages();
        AppStateTherapist.stateMessages.userIdPatient = userIdPatient;
        AppStateTherapist.stateMessages.patientMessages = PatientMessagesService.patientMessages;
    }

    public static setStateExercise(userIdPatient: string, contentIdExercise: string) {
        AppStateTherapist.state = STATE_VIEW_EXERCISE;
        AppStateTherapist.stateViewExercise = new AppStateViewExercise();
        AppStateTherapist.stateViewExercise.userIdPatient = userIdPatient;
        AppStateTherapist.stateViewExercise.contentIdExercise = contentIdExercise;
    }

    public static getStateOverview(): AppStateTherapistOverview {
        if (!this.isStateOverview()) throw new Error("Not in state OVERVIEW!");
        return AppStateTherapist.stateOverview;
    }

    public static getStateMessages(): AppStateTherapistMessages {
        if (!this.isStateMessages()) throw new Error("Not in state MESSAGES!");
        return AppStateTherapist.stateMessages;
    }

    public static getPatientOverviewForUser(userIdPatient: string): PatientOverview {
        return PatientsOverviewHelper.getPatientOverviewForUser(PatientsOverviewService.patientsOverview, userIdPatient);
    }

    public static getStateViewExercise(): AppStateViewExercise {
        if (!this.isStateViewExercise()) throw new Error("Not in state VIEW_EXERCISE");
        return AppStateTherapist.stateViewExercise;
    }

}

export class AppStateTherapistOverview {
    public patientsOverview: PatientsOverview;
}

export class AppStateTherapistMessages {
    public userIdPatient: string;
    public patientMessages: PatientMessages;
}

export class AppStateViewExercise {
    public userIdPatient: string;
    public contentIdExercise: string;
}