import modal from './modal.html'
import * as Mustache from "mustache";

export class ModalAlert {

    id: string;
    title: string;
    text: string;
    buttonCancelLabel: string;
    buttonConfirmId: string;
    buttonConfirmLabel: string;

    public create(): void {
        const template: string = modal;
        const html: string = Mustache.render(template, this);
        document.body.insertAdjacentHTML("beforeend", html);
    }

}

