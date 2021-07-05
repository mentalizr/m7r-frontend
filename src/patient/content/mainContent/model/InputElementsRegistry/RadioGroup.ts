import {AbstractInputElement} from "./AbstractInputElement";

export class RadioGroup extends AbstractInputElement {

    constructor(id: string) {
        super(id);
    }

    public static getInstance(element: HTMLElement): RadioGroup {
        const radioGroup = new RadioGroup(element.id);
        if (element.hasAttribute("data-m7r-ref-id")) {
            radioGroup._refId = element.getAttribute("data-m7r-ref-id");
        }
        return radioGroup;
    }

    toString() {
        return "[" + this._id + "] " + RadioGroup.name;
    }

    getTypeString(): string {
        return "radio";
    }

    getValue(): string {
        const selector: string = "#" + this._id + " input[type='radio']:checked";

        // console.log("[RadioGroup] selector: " + selector);

        const element = <HTMLInputElement> document.querySelector(selector);

        if (element === null) {
            // console.log("[RadioGroup] element is null.");
            return "";
        }

        // if (element !== null) {
        //     console.log("[RadioGroup] id: " + element.id);
        // }

        return element.value;
    }

    setValue(value: string): void {
        const selector: string = "#" + this._id + "_" + value;

        const element = <HTMLInputElement>document.querySelector(selector);
        if (element === null) {
            // console.log("[RadioGroup] found element to check is null. selector=" + selector);
            return
        }

        element.checked = true;
    }

}