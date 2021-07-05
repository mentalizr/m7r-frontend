import {FormData} from "./FormData";

export class FormDataModel {

    private _formDataPageScope: FormData = undefined;
    private _formDataProgramGenericScope: FormData = undefined;
    private _formDataProgramNamedScope: Map<string, FormData>;

    constructor() {
        this._formDataProgramNamedScope = new Map();
    }

    public setInPageScope(pageFormData: FormData): void {
        this._formDataPageScope = pageFormData;
    }

    public hasInPageScope(): boolean {
        return this._formDataPageScope !== undefined;
    }

    public getInPageScope(): FormData {
        return this._formDataPageScope;
    }

    public setInProgramGenericScope(programGenericFormData: FormData): void {
        this._formDataProgramGenericScope = programGenericFormData;
    }

    public hasInProgramGenericScope(): boolean {
        return this._formDataProgramGenericScope !== undefined;
    }

    public getInProgramGenericScope(): FormData {
        return this._formDataProgramGenericScope;
    }

    public addInProgramNamedScope(scopeId: string, programScopeFormData: FormData): void {
        this._formDataProgramNamedScope.set(scopeId, programScopeFormData);
    }

    public hasInProgramNamedScope(scopeId: string): boolean {
        return this._formDataProgramNamedScope.has(scopeId);
    }

    public getInProgramNamedScope(scopeId: string): FormData {
        return this._formDataProgramNamedScope.get(scopeId);
    }

    public debugOut(): void {
        console.log("FormDataModel:");

        console.log("    PageScope:");
        console.log("        " + JSON.stringify(this._formDataPageScope));

        console.log("    ProgramGenericScope:");
        if (this._formDataProgramGenericScope !== undefined) {
            console.log("        " + JSON.stringify(this._formDataProgramGenericScope));
        } else {
            console.log("        undefined.");
        }

        console.log("    ProgramNamedScope:");
        if (this._formDataProgramNamedScope.size === 0) {
            console.log("        none.");
            return;
        }
        for (let scopId of this._formDataProgramNamedScope.keys()) {
            console.log("        scopeId: " + scopId);
            const formData = this._formDataProgramNamedScope.get(scopId);
            console.log("            " + JSON.stringify(formData));
        }

    }

}