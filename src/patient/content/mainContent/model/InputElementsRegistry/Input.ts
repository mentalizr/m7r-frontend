import {AbstractInputElement} from "./AbstractInputElement";

export class Input extends AbstractInputElement {

    constructor(id: string) {
        super(id);
    }

    // constructor(element: HTMLElement) {
    //     super(element);
    // }

    public static getInstance(element: HTMLElement): Input {
        const input = new Input(element.id);
        if (element.hasAttribute("data-m7r-ref-id")) {
            input._refId = element.getAttribute("data-m7r-ref-id");
        }
        return input;
    }

    toString(): string {
        return "[" + this._id + "] " + Input.name;
    }

    getTypeString(): string {
        return "input";
    }

    setValue(value: string): void {
        const element: HTMLInputElement = this.getAsHTMLInputElement();
        element.value = value;
    }

    getValue(): string {
        const element: HTMLInputElement = this.getAsHTMLInputElement();
        return element.value;
    }

}
