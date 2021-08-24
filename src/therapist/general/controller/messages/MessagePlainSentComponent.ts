import {AbstractMessageComponent} from "./AbstractMessageComponent";
import {PatientMessage, PatientMessagePlain} from "../../entities/PatientMessages";
import * as Mustache from "mustache";

const ID_TEMPLATE = "message-plain-sent-template";
const ID_MESSAGE_CONTENT = "message-content";

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

    render() {
        const template = document.getElementById(ID_TEMPLATE).innerHTML;
        const rendered: string = Mustache.render(template, this);

        const currentContent: string = document.getElementById(ID_MESSAGE_CONTENT).innerHTML;
        document.getElementById(ID_MESSAGE_CONTENT).innerHTML = currentContent + rendered;
    }

}