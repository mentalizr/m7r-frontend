import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";
import {Model} from "../model/Model";
import {PatientStatus} from "../entities/PatientStatus";
import {ErrorHandler} from "../../../general/error/ErrorHandler";

const SERVICE_NAME = "patient/patientStatus";

export class PatientStatusFetch {

    private static patientStatus: PatientStatus = undefined;

    public static execute() {

        const service: string = SERVICE_BASE + "/" + SERVICE_NAME;

        return fetch(service, {credentials: "include"})
            .then(PatientStatusFetch.status)
            .then(PatientStatusFetch.json)
            .then(PatientStatusFetch.updateModel)
            .catch(ErrorHandler.handleError);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        PatientStatusFetch.patientStatus = data;
    }

    public static hasLastContentId(): boolean {
        return PatientStatusFetch.patientStatus != undefined && PatientStatusFetch.patientStatus.lastContentId != "";
    }

    public static getLastContentId(): string {
        const lastContentId: string = PatientStatusFetch.patientStatus.lastContentId;
        PatientStatusFetch.patientStatus = undefined;
        return lastContentId;
    }

}