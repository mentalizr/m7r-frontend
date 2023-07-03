import {SERVICE_BASE} from "../Globals";
import {RestResponse} from "../helper/RestResponse";
import {SessionStatusEntity} from "../patient/general/entities/SessionStatusEntity";
import {SessionStatus} from "../patient/general/entities/SessionStatus";

const SERVICE_NAME = "sessionStatus";

export class SessionStatusFetch {

    private static _service: string = SERVICE_BASE + "/" + SERVICE_NAME;
    private static sessionStatusEntity: SessionStatusEntity;

    public static execute(): Promise<void> {
        return fetch(SessionStatusFetch._service, {credentials: "include"})
            .then(SessionStatusFetch.status)
            .then(SessionStatusFetch.json)
            .then(SessionStatusFetch.updateModel);
    }

    public static getSessionStatus(): SessionStatus {
        return new SessionStatus(SessionStatusFetch.sessionStatusEntity);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        SessionStatusFetch.sessionStatusEntity = data;
        // console.log("hasSession? " + SessionStatusFetch.sessionStatusEntity.status);
        // console.log("userRole: " + SessionStatusFetch.sessionStatusEntity.userRole);
        // console.log("require: " + SessionStatusFetch.sessionStatusEntity.require)
        // console.log("sessionId: " + SessionStatusFetch.sessionStatusEntity.sessionId);
    }

}