export abstract class AbstractInputElement {

    protected _id: string;
    protected _refId: string;

    // protected constructor(element: HTMLElement) {
    //     this._id = element.id;
    //     if (element.hasAttribute("data-m7r-ref-id")) {
    //         this._refId = element.getAttribute("data-m7r-ref-id");
    //     } else {
    //         this._refId = element.id;
    //     }
    // }

    protected constructor(id: string) {
        this._id = id;
        this._refId = id;
    }

    public getId(): string {
        return this._id;
    }

    public setRefId(refId: string) {
        this._refId = refId;
    }

    public getRefId(): string {
        return this._refId;
    }

    public abstract getValue(): string;

    public abstract setValue(value: string): void;

    public abstract getTypeString(): string;

    public abstract toString(): string;

    protected getAsHTMLInputElement(): HTMLInputElement {
        return <HTMLInputElement>document.getElementById(this._id);
    }


}