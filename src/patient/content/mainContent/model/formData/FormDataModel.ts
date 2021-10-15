import {FormData} from "./FormData";
import {FormDataEntity} from "./FormDataEntity";

export class FormDataModel {

    private formDataPageScope: FormDataEntity = undefined;
    private formDataProgramGenericScope: FormData = undefined;
    private formDataProgramNamedScope: Map<string, FormData>;

    constructor() {
        this.formDataProgramNamedScope = new Map();
    }

    public setInPageScope(pageFormData: FormData): void {
        this.formDataPageScope = new FormDataEntity(pageFormData);
    }

    public hasInPageScope(): boolean {
        return this.formDataPageScope !== undefined;
    }

    public getInPageScope(): FormData {
        if (this.formDataPageScope == undefined) throw new Error("Illegal state. No form data in page scope.");
        return this.formDataPageScope.getFormData();
    }

    public setInProgramGenericScope(programGenericFormData: FormData): void {
        this.formDataProgramGenericScope = programGenericFormData;
    }

    public hasInProgramGenericScope(): boolean {
        return this.formDataProgramGenericScope !== undefined;
    }

    public getInProgramGenericScope(): FormData {
        return this.formDataProgramGenericScope;
    }

    public addInProgramNamedScope(scopeId: string, programScopeFormData: FormData): void {
        this.formDataProgramNamedScope.set(scopeId, programScopeFormData);
    }

    public hasInProgramNamedScope(scopeId: string): boolean {
        return this.formDataProgramNamedScope.has(scopeId);
    }

    public getInProgramNamedScope(scopeId: string): FormData {
        return this.formDataProgramNamedScope.get(scopeId);
    }

    public hasSentExercise(): boolean {
        return this.hasInPageScope() && this.formDataPageScope.hasSentExercise();
    }

    public debugOut(): void {
        console.log("FormDataModel:");

        console.log("    PageScope:");
        console.log("        " + JSON.stringify(this.formDataPageScope));

        console.log("    ProgramGenericScope:");
        if (this.formDataProgramGenericScope !== undefined) {
            console.log("        " + JSON.stringify(this.formDataProgramGenericScope));
        } else {
            console.log("        undefined.");
        }

        console.log("    ProgramNamedScope:");
        if (this.formDataProgramNamedScope.size === 0) {
            console.log("        none.");
            return;
        }
        for (let scopId of this.formDataProgramNamedScope.keys()) {
            console.log("        scopeId: " + scopId);
            const formData = this.formDataProgramNamedScope.get(scopId);
            console.log("            " + JSON.stringify(formData));
        }

    }

}