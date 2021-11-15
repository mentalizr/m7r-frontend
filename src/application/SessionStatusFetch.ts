import {SERVICE_BASE} from "../Globals";
import {RestResponse} from "../helper/RestResponse";
import {SessionStatus} from "../patient/general/entities/SessionStatus";

const SERVICE_NAME = "sessionStatus";

export class SessionStatusFetch {

    private static _service: string = SERVICE_BASE + "/" + SERVICE_NAME;

    public static sessionStatus: SessionStatus;

    public static execute(): Promise<void> {

        return fetch(SessionStatusFetch._service, {credentials: "include"})
            .then(SessionStatusFetch.status)
            .then(SessionStatusFetch.json)
            .then(SessionStatusFetch.updateModel);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        SessionStatusFetch.sessionStatus = data;
        // console.log("hasSession? " + SessionStatusFetch.sessionStatus.hasSession);
        // console.log("sessionId: " + SessionStatusFetch.sessionStatus.sessionId);
        // console.log("userRole: " + SessionStatusFetch.sessionStatus.userRole);
    }

}