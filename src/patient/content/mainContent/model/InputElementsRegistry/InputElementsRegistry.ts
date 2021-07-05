import {ProgramNamedScopeElements} from "./ProgramNamedScopeElements";
import {AbstractInputElement} from "./AbstractInputElement";
import {RefIdRegistry} from "./RefIdRegistry";

export class InputElementsRegistry {

    private _pageScopeElements: Set<AbstractInputElement>;
    private _programGenericScopeElements: Set<AbstractInputElement>;
    private _programNamedScopeElements: ProgramNamedScopeElements;
    private _allElements: Map<string, AbstractInputElement>;
    private _refIdRegistry: RefIdRegistry;

    constructor() {
        this._pageScopeElements = new Set<AbstractInputElement>();
        this._programGenericScopeElements = new Set<AbstractInputElement>();
        this._programNamedScopeElements = new ProgramNamedScopeElements();
        this._allElements = new Map();
        this._refIdRegistry = new RefIdRegistry();
    }

    public addElementToPageScope(element: AbstractInputElement): void {
        this._pageScopeElements.add(element);
        this._allElements.set(element.getId(), element);
        this._refIdRegistry.add(element);
    }

    public addElementToProgramGenericScope(abstractInputElement: AbstractInputElement): void {
        this._programGenericScopeElements.add(abstractInputElement);
        this._allElements.set(abstractInputElement.getId(), abstractInputElement);
        this._refIdRegistry.add(abstractInputElement);
    }

    public addElementToProgramNamedScope(abstractInputElement: AbstractInputElement, scopeId: string): void {
        this._programNamedScopeElements.addElementToProgramScope(abstractInputElement, scopeId);
        this._allElements.set(abstractInputElement.getId(), abstractInputElement);
        this._refIdRegistry.add(abstractInputElement);
    }

    public hasElementsInScopePage(): boolean {
        return this._pageScopeElements.size > 0;
    }

    public hasElementsInScopeProgramGeneric(): boolean {
        return this._programGenericScopeElements.size > 0;
    }

    public hasElementsInScopeProgramNamed(): boolean {
        return this._programNamedScopeElements.hasElements();
    }

    public hasElements(): boolean {
        return this.hasElementsInScopePage() || this.hasElementsInScopeProgramGeneric() || this.hasElementsInScopeProgramNamed();
    }

    public hasElement(id: string): boolean {
        return this._allElements.has(id);
    }

    public getPageScopeElements(): Set<AbstractInputElement> {
        return this._pageScopeElements;
    }

    public getElementById(id: string): AbstractInputElement {
        return this._allElements.get(id);
    }

    public getProgramGenericScopeElements(): Set<AbstractInputElement> {
        return this._programGenericScopeElements;
    }

    public getProgramNamedScopeElements(): ProgramNamedScopeElements {
        return this._programNamedScopeElements;
    }

    public getAbstractInputElements(refId: string): Set<AbstractInputElement> {
        return this._refIdRegistry.getIds(refId);
    }

    public debugOut(): void {

        console.log("--- Content of InputElementsRegistry:");

        console.log("PageScopeElements:");
        for (let element of this._pageScopeElements) {
            console.log("    " + element.toString());
        }

        console.log("ProgramGenericElements:");
        for (let element of this._programGenericScopeElements) {
            console.log("    " + element.toString());
        }

        this._programNamedScopeElements.debugOut();

        console.log("---");

    }

}