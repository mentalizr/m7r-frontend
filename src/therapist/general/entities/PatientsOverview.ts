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
