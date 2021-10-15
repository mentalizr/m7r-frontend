import {TAG_EXERCISE, TAG_FEEDBACK, TAG_PERSISTENT} from "../../../../Globals";
import {FeedbackData} from "./formData/FeedbackData";
import {InputElementsRegistry} from "./InputElementsRegistry/InputElementsRegistry";
import {InputElementsRegistryFactory} from "./InputElementsRegistry/InputElementsRegistryFactory";
import {FormDataModel} from "./formData/FormDataModel";

export class StepModel {

    private readonly _contentHtml: string = undefined;
    private readonly _inputElementsRegistry: InputElementsRegistry = undefined;

    private _formDataModel: FormDataModel = undefined;
    private _feedbackData: FeedbackData = undefined;

    private _taggedAsExercise: boolean = undefined;
    private _taggedAsFeedback: boolean = undefined;

    constructor(contentHtml: string) {

        this._contentHtml = contentHtml;
        this._inputElementsRegistry = InputElementsRegistryFactory.getInstance(contentHtml);
        this._formDataModel = new FormDataModel();
        this.parseGlobalDirectives(contentHtml);

        // StepModel._inputElementsRegistry.debugOut();
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

    public setFeedbackData(feedbackData: FeedbackData) {
        this._feedbackData = feedbackData;
    }

    public getFeedbackData(): FeedbackData {
        if (this._taggedAsFeedback && this._feedbackData == undefined) {
            console.log("[StepModel] Assertion Error: Not initialized completely. FeedbackData is missing.");
        }
        return this._feedbackData;
    }

    public setFormDataModel(formDataModel: FormDataModel) {
        this._formDataModel = formDataModel;
    }

    public getFormDataModel(): FormDataModel {
        return this._formDataModel;
    }

    public isTaggedAsExercise(): boolean {
        return this._taggedAsExercise;
    }

    public isTaggedAsFeedback(): boolean {
        return this._taggedAsFeedback;
    }

    public hasPersistableContent(): boolean {
        return this._inputElementsRegistry.hasElements();
        // return this._taggedAsPersistent || this._taggedAsExercise;
    }

    public isEditable(): boolean {
        // TODO rework feedback
        return true;
        // if (this._formDataModel.getInPageScope()) {
        //     return this._formDataModel.getInPageScope().editable;
        // }
        // return false;
    }

    private parseGlobalDirectives(contentHtml: string) {

        // const regexPersistentTag = "<!--[\\s\\S]*" + TAG_PERSISTENT + "[\\s\\S]*-->";
        // if (contentHtml.match(regexPersistentTag)) {
        //     this._taggedAsPersistent = true;
        // } else {
        //     this._taggedAsPersistent = false;
        // }

        const regexExerciseTag = "<!--[\\s\\S]*" + TAG_EXERCISE + "[\\s\\S]*-->";
        if (contentHtml.match(regexExerciseTag)) {
            this._taggedAsExercise = true;
        } else {
            this._taggedAsExercise = false;
        }

        const regexFeedbackTag = "<!--[\\s\\S]*" + TAG_FEEDBACK + "[\\s\\S]*-->";
        if (contentHtml.match(regexFeedbackTag)) {
            this._taggedAsFeedback = true;
        } else {
            this._taggedAsFeedback = false;
        }

    }

}