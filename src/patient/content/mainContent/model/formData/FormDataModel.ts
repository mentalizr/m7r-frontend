import {FormData} from "./FormData";
import {FormDataEntity} from "./FormDataEntity";
import {Model} from "../../../../general/model/Model";

export class FormDataModel {

    private feedback: boolean;
    private formDataPageScopePreviousStep: FormDataEntity = undefined;
    private formDataPageScope: FormDataEntity = undefined;
    private formDataProgramGenericScope: FormData = undefined;
    private formDataProgramNamedScope: Map<string, FormData>;

    constructor() {
        this.feedback = Model.getProgramModel().isCurrentStepFeedback();
        this.formDataProgramNamedScope = new Map();
    }

    public setInPageScopePreviousStep(pageFormData: FormData): void {
        this.formDataPageScopePreviousStep = new FormDataEntity(pageFormData);
    }

    public hasInPageScopePreviousStep(): boolean {
        return this.formDataPageScopePreviousStep !== undefined;
    }

    public getInPageScopePreviousStep(): FormData {
        if (this.formDataPageScopePreviousStep === undefined)
            throw new Error("Illegal state. No form data in page scope for previous step.");
        return this.formDataPageScopePreviousStep.getFormData();
    }

    public setInPageScope(pageFormData: FormData): void {
        this.formDataPageScope = new FormDataEntity(pageFormData);
    }

    public hasInPageScope(): boolean {
        return this.formDataPageScope !== undefined;
    }

    public getInPageScope(): FormData {
        if (this.formDataPageScope === undefined) throw new Error("Illegal state. No form data in page scope.");
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

    public hasFeedback(): boolean {
        if (!this.hasInPageScopePreviousStep()) throw new Error("Illegal state. No form data for previous exercise step.");
        return this.formDataPageScopePreviousStep.isFeedback();
    }

    public getFeedbackText(): string {
        if (!this.hasFeedback()) throw new Error("Illegal state. Form data for previous exercise step does not contain feedback.");
        return this.formDataPageScopePreviousStep.getFeedbackText();
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