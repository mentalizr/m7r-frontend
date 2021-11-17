import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";
import {ModelTherapist} from "../model/ModelTherapist";
import {PatientMessages} from "../entities/PatientMessages";
import {FetchResponseError} from "../../../patient/content/mainContent/formDataPersist/rest/FetchResponseError";
import {ErrorHandler} from "../../../general/error/ErrorHandler";

const SERVICE_NAME = "therapist/patientMessages";

export class PatientMessagesService {

    public static patientMessages: PatientMessages = undefined;

    public static execute(patientId: string) {

        const service: string = SERVICE_BASE + "/" + SERVICE_NAME + "/" + patientId;

        return fetch(service, {credentials: "include"})
            .then(PatientMessagesService.status)
            .then(PatientMessagesService.json)
            .then(PatientMessagesService.updateModel)
            .catch(ErrorHandler.handleError);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        PatientMessagesService.patientMessages = data;
        // TODO debug
        // console.log("AppConfig: " + JSON.stringify(ModelTherapist.patientsOverview));
        // for (let patientOverview of ModelTherapist.patientsOverview.patientOverviews) {
        //     console.log("displayName: " + patientOverview.displayName + "; hasReceiveStatus: " + patientOverview.hasReceiveStatus + "; received: " + patientOverview.received);
        // }
    }

}