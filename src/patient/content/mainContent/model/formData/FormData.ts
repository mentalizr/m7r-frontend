export interface Exercise {
    sent: boolean;
    lastModifiedTimestamp: string;
    seenByTherapist: boolean;
    seenByTherapistTimestamp: string;
}

export interface FormElementDataList {
    formElementType: string;    // input | radio
    formElementId: string;
    formElementValue: string;
}

export interface Feedback {
    text: string;
    createdTimestamp: string;
    therapistId: string;
    seenByPatient: boolean;
    seenByPatientTimestamp: string;
}

export interface FormData {
    userId: string;
    contentId: string;
    editable: boolean;
    exercise: Exercise;
    formElementDataList: FormElementDataList[];
    feedback: Feedback;
}