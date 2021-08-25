import {AbstractMessageComponent} from "./AbstractMessageComponent";
import {PatientMessage, PatientMessagePlain} from "../../entities/PatientMessages";

export class MessagePlainReceivedComponent extends AbstractMessageComponent {

    public text: string;
    public date: string;

    constructor(patientMessage: PatientMessage) {
        super();
        const patientMessagePlain: PatientMessagePlain = patientMessage.patientMessagePlain;
        this.text = patientMessagePlain.text;
        this.date = patientMessagePlain.date;
    }

    getTemplateName(): string {
        return "message-plain-received-template";
    }

}