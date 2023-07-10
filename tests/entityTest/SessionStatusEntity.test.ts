import {it} from "mocha";
import {assert} from "chai";
import {SessionStatusEntity} from "../../src/patient/general/entities/SessionStatusEntity";

describe("SessionStatusEntity", () => {

    it("admin session", () => {
        const sessionStatusEntity: SessionStatusEntity
            = JSON.parse("{\"require\":\"\",\"sessionId\":\"A308B869030D4DBFE1B7DB5D1E1A3FB1\",\"status\":\"VALID\",\"userRole\":\"ADMIN\"}");

        assert.equal(sessionStatusEntity.sessionId, "A308B869030D4DBFE1B7DB5D1E1A3FB1", "sessionId");
        assert.equal(sessionStatusEntity.userRole, "ADMIN", "userRole")
        assert.equal(sessionStatusEntity.status, "VALID", "status");
    });

    it("patient session", () => {
        const sessionStatus: SessionStatusEntity
            = JSON.parse("{\"require\":\"\",\"sessionId\":\"18380415ECF42B0FACAF8FDC2ED1D05C\",\"userRole\":\"LOGIN_PATIENT\",\"status\":\"VALID\"}");

        assert.equal(sessionStatus.sessionId, "18380415ECF42B0FACAF8FDC2ED1D05C", "sessionId");
        assert.equal(sessionStatus.userRole, "LOGIN_PATIENT", "userRole")
        assert.equal(sessionStatus.status, "VALID", "status");
    });

    it("therapist session", () => {
        const sessionStatus: SessionStatusEntity
            = JSON.parse("{\"require\":\"\",\"sessionId\":\"5BB4A5370546C03FBE72C04E806A0116\",\"userRole\":\"THERAPIST\",\"status\":\"VALID\"}");

        assert.equal(sessionStatus.sessionId, "5BB4A5370546C03FBE72C04E806A0116", "sessionId");
        assert.equal(sessionStatus.userRole, "THERAPIST", "userRole")
        assert.equal(sessionStatus.status, "VALID", "status");
    });

    it("intermediate session", () => {
        const sessionStatus: SessionStatusEntity
            = JSON.parse("{\"require\":\"POLICY_CONSENT\",\"sessionId\":\"59C998090AE499CCE0DA30E6E9AABF68\",\"status\":\"INTERMEDIATE\",\"userRole\":\"LOGIN_PATIENT\"}");

        assert.equal(sessionStatus.sessionId, "59C998090AE499CCE0DA30E6E9AABF68", "sessionId");
        assert.equal(sessionStatus.userRole, "LOGIN_PATIENT", "userRole")
        assert.equal(sessionStatus.status, "INTERMEDIATE", "status");
        assert.equal(sessionStatus.require, "POLICY_CONSENT", "require");
    });

    it("invalid session", () => {
        const sessionStatus: SessionStatusEntity
            = JSON.parse("{\"require\":\"\",\"sessionId\":\"\",\"userRole\":\"UNDEFINED\",\"status\":\"INVALID\"}");

        assert.isNotOk(sessionStatus.sessionId, "sessionId");
        assert.equal(sessionStatus.userRole, "UNDEFINED", "userRole")
        assert.equal(sessionStatus.status, "INVALID", "status");
    });

})
