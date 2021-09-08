import {it} from "mocha";
import {assert} from "chai";
import {SessionStatus} from "../../src/patient/general/entities/SessionStatus";

describe("SessionStatus", () => {

    it("admin session", () => {
        const sessionStatus: SessionStatus
            = JSON.parse("{\"sessionId\":\"0AF68AEFADCE4733B91AB320378D69D4\",\"userRole\":\"ADMIN\",\"valid\":true}");

        assert.equal(sessionStatus.sessionId, "0AF68AEFADCE4733B91AB320378D69D4", "sessionId");
        assert.equal(sessionStatus.userRole, "ADMIN", "userRole")
        assert.isTrue(sessionStatus.valid, "valid");
    });

    it("patient session", () => {
        const sessionStatus: SessionStatus
            = JSON.parse("{\"sessionId\":\"18380415ECF42B0FACAF8FDC2ED1D05C\",\"userRole\":\"PATIENT\",\"valid\":true}");

        assert.equal(sessionStatus.sessionId, "18380415ECF42B0FACAF8FDC2ED1D05C", "sessionId");
        assert.equal(sessionStatus.userRole, "PATIENT", "userRole")
        assert.isTrue(sessionStatus.valid, "valid");
    });

    it("therapist session", () => {
        const sessionStatus: SessionStatus
            = JSON.parse("{\"sessionId\":\"5BB4A5370546C03FBE72C04E806A0116\",\"userRole\":\"THERAPIST\",\"valid\":true}");

        assert.equal(sessionStatus.sessionId, "5BB4A5370546C03FBE72C04E806A0116", "sessionId");
        assert.equal(sessionStatus.userRole, "THERAPIST", "userRole")
        assert.isTrue(sessionStatus.valid, "valid");
    });

    it("invalid session", () => {
        const sessionStatus: SessionStatus
            = JSON.parse("{\"sessionId\":\"\",\"userRole\":\"UNDEFINED\",\"valid\":false}");

        assert.isNotOk(sessionStatus.sessionId, "sessionId");
        assert.equal(sessionStatus.userRole, "UNDEFINED", "userRole")
        assert.isFalse(sessionStatus.valid, "valid");
    });

})
