import {AbstractMessageComponent} from "./AbstractMessageComponent";
import {PatientMessage} from "../../entities/PatientMessages";
import {MessagePlainSentComponent} from "./MessagePlainSentComponent";
import {Model} from "../../../../patient/general/model/Model";
import {MessagePlainReceivedComponent} from "./MessagePlainReceivedComponent";
import {MessageFeedbackComponent} from "./MessageFeedbackComponent";

export class MessageComponentFactory {

    public static createMessageComponent(patientMessage: PatientMessage): AbstractMessageComponent {

        const userId = Model.user.userId;

        if (patientMessage.patientMessagePlain != null) {
            if (patientMessage.patientMessagePlain.senderId == userId) {
                return new MessagePlainSentComponent(patientMessage);
            } else {
                return new MessagePlainReceivedComponent(patientMessage);
            }
        } else if (patientMessage.patientMessageFeedback != null) {
            return new MessageFeedbackComponent(patientMessage);
        }

        // TODO ...

    }

}