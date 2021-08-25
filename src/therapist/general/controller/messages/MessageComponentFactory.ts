import {AbstractMessageComponent} from "./AbstractMessageComponent";
import {PatientMessage} from "../../entities/PatientMessages";
import {MessagePlainSentComponent} from "./MessagePlainSentComponent";
import {Model} from "../../../../patient/general/model/Model";
import {MessagePlainReceivedComponent} from "./MessagePlainReceivedComponent";
import {MessageFeedbackComponent} from "./MessageFeedbackComponent";
import {Logger} from "../../../../helper/Logger";
import {MessageExerciseComponent} from "./MessageExerciseComponent";

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
        } else if (patientMessage.patientMessageExercise != null) {
            return new MessageExerciseComponent(patientMessage);
        } else {
            Logger("Unknown type of message.");
        }
    }

}