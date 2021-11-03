import {PatientMessagesService} from "../../rest/PatientMessagesService";
import {AbstractMessageComponent} from "../messages/AbstractMessageComponent";
import {MessageComponentFactory} from "../messages/MessageComponentFactory";
import {AppStateTherapist} from "../../model/AppStateTherapist";
import {TherapistAppController} from "../../../TherapistAppController";
import {NavbarTherapistController} from "../NavbarTherapistController";

export class PatientMessagesController {

    public static initialize(patientId: string): Promise<any> {
        let patientMessagesFetch = PatientMessagesService.execute(patientId);

        return Promise.all([patientMessagesFetch])
            .then(function() {
                // Logger(JSON.stringify(PatientMessagesFetch.patientMessages));
                AppStateTherapist.setStateMessages(patientId);
                PatientMessagesController.render();
                PatientMessagesController.registerEvents();
                NavbarTherapistController.showArrowBack();
                NavbarTherapistController.showRefreshButton();
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
        }

        window.scrollTo(0, document.body.scrollHeight);
    }

    private static registerEvents(): void {
        let patientMessages = AppStateTherapist.getStateMessages().patientMessages;
        for (let patientMessage of patientMessages.patientMessages) {
            const messageComponent: AbstractMessageComponent
                = MessageComponentFactory.createMessageComponent(patientMessage);
            messageComponent.registerEvents();
        }
    }

}