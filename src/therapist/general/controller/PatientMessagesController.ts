import {SplashController} from "../../../patient/general/controller/SplashController";
import {PatientMessagesFetch} from "../fetch/PatientMessagesFetch";
import {Logger} from "../../../helper/Logger";
import {ModelTherapist} from "../model/ModelTherapist";

export class PatientMessagesController {

    public static initialize(patientId: string): Promise<any> {

        SplashController.show();

        PatientMessagesController.initPatientMessages(patientId)
            .then(() => {
                SplashController.hide();
            })

        return Promise.resolve(undefined);
    }

    private static initPatientMessages(patientId: string) {

        let patientMessagesFetch = PatientMessagesFetch.execute(patientId);

        return Promise.all([patientMessagesFetch])
            .then(function() {
                Logger(JSON.stringify(ModelTherapist.patientMessages));
            });

    }

}