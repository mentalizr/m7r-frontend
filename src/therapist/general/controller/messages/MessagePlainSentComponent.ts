import {AbstractMessageComponent} from "./AbstractMessageComponent";
import {PatientMessage, PatientMessagePlain} from "../../entities/PatientMessages";

export class MessagePlainSentComponent extends AbstractMessageComponent {

    public text: string;
    public date: string;
    public readByReceiver: boolean;

    constructor(patientMessage: PatientMessage) {
        super();
        const patientMessagePlain: PatientMessagePlain = patientMessage.patientMessagePlain;
        this.text = patientMessagePlain.text;
        this.date = patientMessagePlain.date;
        this.readByReceiver = patientMessagePlain.readByReceiver;
    }

    getTemplateName(): string {
        return "message-plain-sent-template";
    }

}