export interface SessionStatusEntity {
    status: string;     // VALID | INTERMEDIATE | INVALID
    require: string;    // POLICY_CONSENT | RENEW_PASSWORD | EMAIL_CONFIRMATION | 2FA
    userRole: string;   // LOGIN_PATIENT | ANONYMOUS_PATIENT | THERAPIST | ADMIN
    sessionId: string;
}