import {MappedSet} from "./MappedSet";
import {AbstractInputElement} from "./AbstractInputElement";

export class RefIdRegistry {

    private _mappedSet: MappedSet<string, AbstractInputElement>;

    constructor() {
        this._mappedSet = new MappedSet<string, AbstractInputElement>();
    }

    public add(abstractInputElement: AbstractInputElement): void {
        this._mappedSet.add(abstractInputElement.getRefId(), abstractInputElement);
    }

    public getIds(refId: string): Set<AbstractInputElement> {
        return this._mappedSet.getValues(refId);
    }

}