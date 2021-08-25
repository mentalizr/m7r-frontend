import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";
import {ModelTherapist} from "../model/ModelTherapist";
import {PatientMessages} from "../entities/PatientMessages";

const SERVICE_NAME = "therapist/patientMessages";

export class PatientMessagesFetch {

    public static patientMessages: PatientMessages = undefined;

    public static execute(patientId: string) {

        const service: string = SERVICE_BASE + "/" + SERVICE_NAME + "/" + patientId;

        return fetch(service, {credentials: "include"})
            .then(PatientMessagesFetch.status)
            .then(PatientMessagesFetch.json)
            .then(PatientMessagesFetch.updateModel);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(data) {
        PatientMessagesFetch.patientMessages = data;
        // TODO debug
        // console.log("AppConfig: " + JSON.stringify(ModelTherapist.patientsOverview));
        // for (let patientOverview of ModelTherapist.patientsOverview.patientOverviews) {
        //     console.log("displayName: " + patientOverview.displayName + "; hasReceiveStatus: " + patientOverview.hasReceiveStatus + "; received: " + patientOverview.received);
        // }
    }

}