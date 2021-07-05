import {TAG_EXERCISE, TAG_FEEDBACK, TAG_PERSISTENT} from "../../../../Globals";
import {FeedbackData} from "./formData/FeedbackData";
import {InputElementsRegistry} from "./InputElementsRegistry/InputElementsRegistry";
import {InputElementsRegistryFactory} from "./InputElementsRegistry/InputElementsRegistryFactory";
import {FormDataModel} from "./formData/FormDataModel";

export class StepModel {

    private static _contentHtml: string = undefined;
    private static _inputElementsRegistry: InputElementsRegistry = undefined;

    private static _formDataModel: FormDataModel = undefined;
    private static _feedbackData: FeedbackData = undefined;

    private static _taggedAsExercise: boolean = undefined;
    private static _taggedAsFeedback: boolean = undefined;

    public static initialize(contentHtml: string) {

        StepModel._contentHtml = contentHtml;
        StepModel._inputElementsRegistry = InputElementsRegistryFactory.getInstance(contentHtml);
        StepModel._formDataModel = new FormDataModel();
        StepModel.parseGlobalDirectives(contentHtml);

        // StepModel._inputElementsRegistry.debugOut();
    }

    public static getAllProgramScopeIds(): Array<string> {
        return this._inputElementsRegistry.getProgramNamedScopeElements().getScopeIdsAsArray();
    }

    public static getContentHtml(): string {
        if (StepModel._contentHtml == undefined) {
            console.log("[StepModel] Assertion Error: Not initialized.");
            console.trace();
        }
        return StepModel._contentHtml;
    }

    public static getInputElementsRegistry(): InputElementsRegistry {
        return this._inputElementsRegistry;
    }

    public static setFeedbackData(feedbackData: FeedbackData) {
        StepModel._feedbackData = feedbackData;
    }

    public static getFeedbackData(): FeedbackData {
        if (StepModel._taggedAsFeedback && StepModel._feedbackData == undefined) {
            console.log("[StepModel] Assertion Error: Not initialized completely. FeedbackData is missing.");
        }
        return StepModel._feedbackData;
    }

    public static setFormDataModel(formDataModel: FormDataModel) {
        StepModel._formDataModel = formDataModel;
    }

    public static getFormDataModel(): FormDataModel {
        return StepModel._formDataModel;
    }

    public static isTaggedAsExercise(): boolean {
        return StepModel._taggedAsExercise;
    }

    public static isTaggedAsFeedback(): boolean {
        return StepModel._taggedAsFeedback;
    }

    public static hasPersistableContent(): boolean {
        return this._inputElementsRegistry.hasElements();
        // return StepModel._taggedAsPersistent || StepModel._taggedAsExercise;
    }

    public static isEditable(): boolean {
        // TODO rework feedback
        return true;
        // if (StepModel._formDataModel.getInPageScope()) {
        //     return StepModel._formDataModel.getInPageScope().editable;
        // }
        // return false;
    }

    private static parseGlobalDirectives(contentHtml: string) {

        // const regexPersistentTag = "<!--[\\s\\S]*" + TAG_PERSISTENT + "[\\s\\S]*-->";
        // if (contentHtml.match(regexPersistentTag)) {
        //     StepModel._taggedAsPersistent = true;
        // } else {
        //     StepModel._taggedAsPersistent = false;
        // }

        const regexExerciseTag = "<!--[\\s\\S]*" + TAG_EXERCISE + "[\\s\\S]*-->";
        if (contentHtml.match(regexExerciseTag)) {
            StepModel._taggedAsExercise = true;
        } else {
            StepModel._taggedAsExercise = false;
        }

        const regexFeedbackTag = "<!--[\\s\\S]*" + TAG_FEEDBACK + "[\\s\\S]*-->";
        if (contentHtml.match(regexFeedbackTag)) {
            StepModel._taggedAsFeedback = true;
        } else {
            StepModel._taggedAsFeedback = false;
        }

    }

}