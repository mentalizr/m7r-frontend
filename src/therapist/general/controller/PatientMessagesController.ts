import {SplashController} from "../../../general/controller/SplashController";
import {PatientMessagesFetch} from "../fetch/PatientMessagesFetch";
import {Logger} from "../../../helper/Logger";
import {AbstractMessageComponent} from "./messages/AbstractMessageComponent";
import {MessageComponentFactory} from "./messages/MessageComponentFactory";
import {AppStateTherapist} from "../model/AppStateTherapist";
import {TherapistAppController} from "../../TherapistAppController";
import {NavbarTherapistController} from "./NavbarTherapistController";

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
                // Logger(JSON.stringify(PatientMessagesFetch.patientMessages));
                AppStateTherapist.setStateMessages(patientId);
                PatientMessagesController.render();
                NavbarTherapistController.showArrowBack();
                NavbarTherapistController.showPatient(patientId);
            });
    }

    private static render() {
        TherapistAppController.cleanView();

        let patientMessages = AppStateTherapist.getStateMessages().patientMessages;
        for (let patientMessage of patientMessages.patientMessages) {
            const messageComponent: AbstractMessageComponent
                = MessageComponentFactory.createMessageComponent(patientMessage);
            messageComponent.render();
            messageComponent.registerEvents();
        }

        window.scrollTo(0, document.body.scrollHeight);
    }

}