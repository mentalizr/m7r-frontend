import {it} from "mocha";
import {assert} from "chai";
import {SessionStatusEntity} from "../../src/patient/general/entities/SessionStatusEntity";

describe("SessionStatusEntity", () => {

    it("admin session", () => {
        const sessionStatusEntity: SessionStatusEntity
            = JSON.parse("{\"sessionId\":\"0AF68AEFADCE4733B91AB320378D69D4\",\"userRole\":\"ADMIN\",\"status\":\"valid\"}");

        assert.equal(sessionStatusEntity.sessionId, "0AF68AEFADCE4733B91AB320378D69D4", "sessionId");
        assert.equal(sessionStatusEntity.userRole, "ADMIN", "userRole")
        assert.equal(sessionStatusEntity.status, "valid", "status");
    });

    it("patient session", () => {
        const sessionStatus: SessionStatusEntity
            = JSON.parse("{\"sessionId\":\"18380415ECF42B0FACAF8FDC2ED1D05C\",\"userRole\":\"PATIENT\",\"status\":\"valid\"}");

        assert.equal(sessionStatus.sessionId, "18380415ECF42B0FACAF8FDC2ED1D05C", "sessionId");
        assert.equal(sessionStatus.userRole, "PATIENT", "userRole")
        assert.equal(sessionStatus.status, "valid", "status");
    });

    it("therapist session", () => {
        const sessionStatus: SessionStatusEntity
            = JSON.parse("{\"sessionId\":\"5BB4A5370546C03FBE72C04E806A0116\",\"userRole\":\"THERAPIST\",\"status\":\"valid\"}");

        assert.equal(sessionStatus.sessionId, "5BB4A5370546C03FBE72C04E806A0116", "sessionId");
        assert.equal(sessionStatus.userRole, "THERAPIST", "userRole")
        assert.equal(sessionStatus.status, "valid", "status");
    });

    it("intermediate session", () => {
        const sessionStatus: SessionStatusEntity
            = JSON.parse("{\"sessionId\":\"\",\"userRole\":\"UNDEFINED\",\"status\":\"intermediate\" , \""
         + "require\":\"POLICY_CONSENT\"}");

        assert.isNotOk(sessionStatus.sessionId, "sessionId");
        assert.equal(sessionStatus.userRole, "UNDEFINED", "userRole")
        assert.equal(sessionStatus.status, "intermediate", "status");
        assert.equal(sessionStatus.require, "POLICY_CONSENT", "require");
    });

    it("invalid session", () => {
        const sessionStatus: SessionStatusEntity
            = JSON.parse("{\"sessionId\":\"\",\"userRole\":\"UNDEFINED\",\"status\":\"invalid\"}");

        assert.isNotOk(sessionStatus.sessionId, "sessionId");
        assert.equal(sessionStatus.userRole, "UNDEFINED", "userRole")
        assert.equal(sessionStatus.status, "invalid", "status");
    });

})
