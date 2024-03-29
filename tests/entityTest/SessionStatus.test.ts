import {it} from "mocha";
import {assert} from "chai";
import {SessionStatusEntity} from "../../src/patient/general/entities/SessionStatusEntity";
import {SessionStatus} from "../../src/patient/general/entities/SessionStatus";

describe("SessionStatus", () => {

    it("admin session", () => {
        const sessionStatus: SessionStatus
            = new SessionStatus(
                JSON.parse(
                    "{\"require\":\"\"," +
                    "\"sessionId\":\"0AF68AEFADCE4733B91AB320378D69D4\"," +
                    "\"userRole\":\"ADMIN\"," +
                    "\"status\":\"valid\"}"
                )
        );

        assert.equal(sessionStatus.getSessionId(), "0AF68AEFADCE4733B91AB320378D69D4", "sessionId");
        assert.isTrue(sessionStatus.isUserInRoleAdmin(), "userRole");
        assert.isFalse(sessionStatus.isUserInRoleTherapist(), "userRole");
        assert.isFalse(sessionStatus.isUserInRolePatient(), "userRole");
        assert.equal(sessionStatus.getUserRole(), "ADMIN", "userRole");
        assert.isTrue(sessionStatus.isValid(),"status");
        assert.isFalse(sessionStatus.isIntermediate(), "status");
    });

    it("patient session", () => {
        const sessionStatus: SessionStatus
            = new SessionStatus(
                JSON.parse(
                    "{\"require\":\"\"," +
                    "\"sessionId\":\"18380415ECF42B0FACAF8FDC2ED1D05C\"," +
                    "\"userRole\":\"LOGIN_PATIENT\"," +
                    "\"status\":\"valid\"}"
                )
        );

        assert.equal(sessionStatus.getSessionId(), "18380415ECF42B0FACAF8FDC2ED1D05C", "sessionId");
        assert.isTrue(sessionStatus.isUserInRolePatient(), "userRole")
        assert.equal(sessionStatus.getUserRole(), "LOGIN_PATIENT", "userRole");
        assert.isTrue(sessionStatus.isValid(), "status");
    });

    it("therapist session", () => {
        const sessionStatus: SessionStatus
            = new SessionStatus(
                JSON.parse(
                    "{\"require\":\"\"," +
                    "\"sessionId\":\"5BB4A5370546C03FBE72C04E806A0116\"," +
                    "\"userRole\":\"THERAPIST\"," +
                    "\"status\":\"valid\"}"
                )
        );

        assert.equal(sessionStatus.getSessionId(), "5BB4A5370546C03FBE72C04E806A0116", "sessionId");
        assert.isTrue(sessionStatus.isUserInRoleTherapist(),"userRole")
        assert.equal(sessionStatus.getUserRole(), "THERAPIST", "userRole");
        assert.isTrue(sessionStatus.isValid(), "status");
    });

    it("intermediate session", () => {
        const sessionStatus: SessionStatus
            = new SessionStatus(
                JSON.parse(
                    "{\"require\":\"POLICY_CONSENT\"," +
                    "\"sessionId\":\"59C998090AE499CCE0DA30E6E9AABF68\"," +
                    "\"status\":\"INTERMEDIATE\"," +
                    "\"userRole\":\"LOGIN_PATIENT\"}"
                )
        );

        assert.isTrue(sessionStatus.isIntermediate(), "status");
        assert.equal(sessionStatus.getSessionId(), "59C998090AE499CCE0DA30E6E9AABF68", "sessionId");
        assert.isFalse(sessionStatus.isUserInRoleTherapist(), "userRole");
        assert.isTrue(sessionStatus.isUserInRolePatient(), "userRole");
        assert.isFalse(sessionStatus.isUserInRoleAdmin(), "userRole");
        assert.equal(sessionStatus.getUserRole(), "LOGIN_PATIENT", "userRole")
        assert.isTrue(sessionStatus.isIntermediate(),"status");
        assert.isFalse(sessionStatus.isValid(),"status");
        assert.isFalse(sessionStatus.isInvalid(),"status");
        assert.isTrue(sessionStatus.isPolicyConsentRequired(),"require");
        assert.isFalse(sessionStatus.isEmailConfirmationRequired(),"require");
        assert.isFalse(sessionStatus.is2FARequired(),"require");
        assert.isFalse(sessionStatus.isRenewPasswordRequired(),"require");
    });

    it("invalid session", () => {
        const sessionStatus: SessionStatus
            = new SessionStatus(
                JSON.parse(
                    "{\"require\":\"\"," +
                    "\"sessionId\":\"\"," +
                    "\"status\":\"INVALID\"," +
                    "\"userRole\":\"UNDEFINED\"}"
                )
        );

        assert.isNotOk(sessionStatus.getSessionId(), "sessionId");
        assert.equal(sessionStatus.getUserRole(), "UNDEFINED", "userRole")
        assert.isTrue(sessionStatus.isInvalid());
        assert.isFalse(sessionStatus.isValid());
    });

})
