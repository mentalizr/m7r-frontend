import {AbstractMessageComponent} from "./AbstractMessageComponent";
import {PatientMessage, PatientMessageFeedback, PatientMessagePlain} from "../../entities/PatientMessages";
import * as Mustache from "mustache";

const ID_TEMPLATE = "message-feedback-template";
const ID_MESSAGE_CONTENT = "message-content";

export class MessageFeedbackComponent extends AbstractMessageComponent {

    public exerciseName: string;
    public text: string;
    public date: string;
    public readByReceiver: boolean;

    constructor(patientMessage: PatientMessage) {
        super();
        const patientMessageFeedback: PatientMessageFeedback = patientMessage.patientMessageFeedback;
        this.exerciseName = patientMessageFeedback.exerciseId;
        this.text = patientMessageFeedback.text;
        this.date = patientMessageFeedback.date;
        this.readByReceiver = patientMessageFeedback.readByReceiver;
    }

    render() {
        const template = document.getElementById(ID_TEMPLATE).innerHTML;
        const rendered: string = Mustache.render(template, this);

        const currentContent: string = document.getElementById(ID_MESSAGE_CONTENT).innerHTML;
        document.getElementById(ID_MESSAGE_CONTENT).innerHTML = currentContent + rendered;
    }

}