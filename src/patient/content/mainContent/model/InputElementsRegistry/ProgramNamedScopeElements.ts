import {AbstractInputElement} from "./AbstractInputElement";

export class ProgramNamedScopeElements {

    private _scopeIdElementsMap: Map<string, Set<AbstractInputElement>>;

    public constructor() {
        this._scopeIdElementsMap = new Map<string, Set<AbstractInputElement>>();
    }

    public addElementToProgramScope(inputElement: AbstractInputElement, scopeId: string): void {
        let idSet: Set<AbstractInputElement>;

        if (this._scopeIdElementsMap.has(scopeId)) {
            idSet = this._scopeIdElementsMap.get(scopeId);
        } else {
            idSet = new Set<AbstractInputElement>();
            this._scopeIdElementsMap.set(scopeId, idSet);
        }

        idSet.add(inputElement);
    }

    public getScopeIds(): IterableIterator<string> {
        return this._scopeIdElementsMap.keys();
    }

    public getScopeIdsAsSet(): Set<string> {
        const scopeIds: IterableIterator<string> = this._scopeIdElementsMap.keys();
        let scopeIdSet: Set<string> = new Set<string>();
        for (let refId of scopeIds) {
            scopeIdSet.add(refId);
        }
        return scopeIdSet;
    }

    public getScopeIdsAsArray(): Array<string> {
        const scopeIds: IterableIterator<string> = this._scopeIdElementsMap.keys();
        let scopeIdArray: Array<string> = new Array<string>();
        for (let refId of scopeIds) {
            scopeIdArray.push(refId);
        }
        return scopeIdArray;
    }

    public getElementsForScopeId(scopeId: string): Set<AbstractInputElement> {
        return this._scopeIdElementsMap.get(scopeId);
    }

    public hasElements(): boolean {
        return this._scopeIdElementsMap.size > 0;
    }

    public debugOut(): void {
        console.log("ProgramNamedScopeElements:");
        const scopeIds = this.getScopeIds();
        for (let scopeId of scopeIds) {
            console.log("    scopeID: " + scopeId);
            const elements = this.getElementsForScopeId(scopeId);
            for (let element of elements) {
                console.log("        " + element.toString());
            }
        }
    }

}