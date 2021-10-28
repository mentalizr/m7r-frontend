import {AbstractMessageComponent} from "./AbstractMessageComponent";
import {PatientMessage, PatientMessageFeedback} from "../../entities/PatientMessages";

export class MessageFeedbackComponent extends AbstractMessageComponent {

    public exerciseName: string;
    public text: string;
    public date: string;
    public readByReceiver: boolean;

    constructor(patientMessage: PatientMessage) {
        const patientMessageFeedback: PatientMessageFeedback = patientMessage.patientMessageFeedback;
        super (patientMessageFeedback.messageId);
        this.exerciseName = patientMessageFeedback.exerciseId;
        this.text = patientMessageFeedback.text;
        this.date = patientMessageFeedback.date;
        this.readByReceiver = patientMessageFeedback.readByReceiver;
    }

    getTemplateName(): string {
        return "message-feedback-template";
    }

    registerEvents() {
    }

}