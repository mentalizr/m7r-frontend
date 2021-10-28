import * as Mustache from "mustache";

const ID_MESSAGE_CONTENT = "message-content";

export abstract class AbstractMessageComponent {

    public messageId: string;

    protected constructor(messageId: string) {
        this.messageId = messageId;
    }

    public abstract getTemplateName(): string;

    render() {
        const templateName = this.getTemplateName();
        const template = document.getElementById(templateName).innerHTML;
        const rendered: string = Mustache.render(template, this);
        const currentContent: string = document.getElementById(ID_MESSAGE_CONTENT).innerHTML;
        document.getElementById(ID_MESSAGE_CONTENT).innerHTML = currentContent + rendered;
    }

    abstract registerEvents();

}