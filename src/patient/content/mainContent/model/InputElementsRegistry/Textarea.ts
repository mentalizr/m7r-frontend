import {AbstractInputElement} from "./AbstractInputElement";

export class Textarea extends AbstractInputElement {

    constructor(id: string) {
        super(id);
    }

    public static getInstance(element: HTMLElement): Textarea {
        const textarea = new Textarea(element.id);
        if (element.hasAttribute("data-m7r-ref-id")) {
            textarea._refId = element.getAttribute("data-m7r-ref-id");
        }
        return textarea;
    }

    toString(): string {
        return "[" + this._id + "] " + Textarea.name;
    }

    getTypeString(): string {
        return "input";
    }

    getValue(): string {
        const element: HTMLInputElement = this.getAsHTMLInputElement();
        return element.value;
    }

    setValue(value: string): void {
        const element: HTMLInputElement = this.getAsHTMLInputElement();
        element.value = value;
    }

}