import {SessionStatusEntity} from "./SessionStatusEntity";

const STATUS_VALID = "VALID";
const STATUS_INVALID = "INVALID";
const STATUS_INTERMEDIATE = "INTERMEDIATE";
const REQUIRE_POLICY_CONSENT = "POLICYCONSENT";
const REQUIRE_RENEW_PASSWORD = "RENEWPASSWORD";
const REQUIRE_EMAIL_CONFIRMATION = "EMAILCONFIRMATION";
const REQUIRE_2FA = "2FA";
const USER_ROLE_PATIENT = "PATIENT";
const USER_ROLE_THERAPIST = "THERAPIST";
const USER_ROLE_ADMIN = "ADMIN";

export class SessionStatus {

    private sessionStatusEntity: SessionStatusEntity;

    constructor(sessionStatusEntity: SessionStatusEntity) {
        this.sessionStatusEntity = sessionStatusEntity;
    }

    isValid(): boolean {
        return this.sessionStatusEntity.status.toUpperCase() === STATUS_VALID;
    }

    isInvalid(): boolean {
        return this.sessionStatusEntity.status.toUpperCase() === STATUS_INVALID;
    }

    isIntermediate(): boolean {
        return this.sessionStatusEntity.status.toUpperCase() === STATUS_INTERMEDIATE;
    }

    isPolicyConsentRequired(): boolean {
        return this.sessionStatusEntity.require.toUpperCase() === REQUIRE_POLICY_CONSENT;
    }

    isRenewPasswordRequired(): boolean {
        return this.sessionStatusEntity.require.toUpperCase() === REQUIRE_RENEW_PASSWORD;
    }

    isEmailConfirmationRequired(): boolean {
        return this.sessionStatusEntity.require.toUpperCase() === REQUIRE_EMAIL_CONFIRMATION;
    }

    is2FARequired(): boolean {
        return this.sessionStatusEntity.require.toUpperCase() === REQUIRE_2FA;
    }

    isUserInRolePatient(): boolean {
        return this.sessionStatusEntity.userRole.toUpperCase() === USER_ROLE_PATIENT;
    }

    isUserInRoleTherapist(): boolean {
        return this.sessionStatusEntity.userRole.toUpperCase() === USER_ROLE_THERAPIST;
    }

    isUserInRoleAdmin(): boolean {
        return this.sessionStatusEntity.userRole.toUpperCase() === USER_ROLE_ADMIN;
    }

    getUserRole(): string {
        return this.sessionStatusEntity.userRole;
    }

    getSessionId(): string {
        return this.sessionStatusEntity.sessionId;
    }

}