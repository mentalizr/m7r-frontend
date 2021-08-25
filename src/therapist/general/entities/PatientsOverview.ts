import {Logger} from "../../../helper/Logger";

export interface PatientOverview {
    userId: string;
    displayName: string;
    initials: string;
    hasUpdate: boolean;
    overviewMessage: string;
    lastActiveDate: string;
    hasReceiveStatus: boolean;
    received: boolean;
}

export interface PatientsOverview {
    patientOverviews: PatientOverview[];
}

export class PatientsOverviewHelper {

    public static getPatientOverviewForUser(patientsOverview: PatientsOverview, userId: string): PatientOverview {
        for (let patientOverview of patientsOverview.patientOverviews) {
            if (patientOverview.userId == userId) return patientOverview;
        }
        Logger("Could not find overview element for user: " + userId);
    }

}
