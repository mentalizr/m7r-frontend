export interface SessionStatusEntity {
    status: string;     // valid | intermediate | invalid
    require: string;    // policyConsent | renewPassword | emailConfirmation | 2FA
    userRole: string;
    sessionId: string;
}