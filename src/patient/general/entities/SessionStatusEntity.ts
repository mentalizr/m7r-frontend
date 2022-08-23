export interface SessionStatusEntity {
    status: string;     // valid | intermediate | invalid
    require: string;    // POLICY_CONSENT | RENEW_PASSWORD | EMAIL_CONFIRMATION | 2FA
    userRole: string;
    sessionId: string;
}