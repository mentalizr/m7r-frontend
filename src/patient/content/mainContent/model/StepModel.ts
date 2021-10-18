import {InputElementsRegistry} from "./InputElementsRegistry/InputElementsRegistry";
import {InputElementsRegistryFactory} from "./InputElementsRegistry/InputElementsRegistryFactory";
import {FormDataModel} from "./formData/FormDataModel";

export class StepModel {

    private readonly _contentHtml: string = undefined;
    private readonly _inputElementsRegistry: InputElementsRegistry = undefined;

    private _formDataModel: FormDataModel = undefined;

    constructor(contentHtml: string) {
        this._contentHtml = contentHtml;
        this._inputElementsRegistry = InputElementsRegistryFactory.getInstance(contentHtml);
        this._formDataModel = new FormDataModel();
    }

    public getAllProgramScopeIds(): Array<string> {
        return this._inputElementsRegistry.getProgramNamedScopeElements().getScopeIdsAsArray();
    }

    public getContentHtml(): string {
        if (this._contentHtml == undefined) {
            console.log("[StepModel] Assertion Error: Not initialized.");
            console.trace();
        }
        return this._contentHtml;
    }

    public getInputElementsRegistry(): InputElementsRegistry {
        return this._inputElementsRegistry;
    }

    public setFormDataModel(formDataModel: FormDataModel) {
        this._formDataModel = formDataModel;
    }

    public getFormDataModel(): FormDataModel {
        return this._formDataModel;
    }

    public hasPersistableContent(): boolean {
        return this._inputElementsRegistry.hasElements();
        // return this._taggedAsPersistent || this._taggedAsExercise;
    }

}