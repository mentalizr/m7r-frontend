export interface PatientMessageBase {
    senderId: string;
    date: string;
    new: boolean;
    readByReceiver: boolean;
    text: string;
}

export interface PatientMessagePlain extends PatientMessageBase {
}

export interface PatientMessageExercise extends PatientMessageBase {
    exerciseId: string;
    hasFeedback: boolean;
}

export interface PatientMessageFeedback extends PatientMessageBase {
    exerciseId: string;
}

export interface PatientMessage {
    patientMessagePlain: PatientMessagePlain;
    patientMessageExercise: PatientMessageExercise;
    patientMessageFeedback: PatientMessageFeedback;
}

export interface PatientMessages {
    patientId: string;
    patientMessages: PatientMessage[];
}