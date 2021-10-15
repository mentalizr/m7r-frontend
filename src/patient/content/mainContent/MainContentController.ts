import {MainContentView} from "./MainContentView";
import {GeneralAlertController} from "../generalAlert/GeneralAlertController";
import {FormDataUpdater} from "./formDataPersist/FormDataUpdater";
import {FormDataModel} from "./model/formData/FormDataModel";
import {ScrollUpController} from "../../../general/controller/ScrollUpController";
import {Model} from "../../general/model/Model";

export class MainContentController {

    public static updateView(): void {

        // console.log("[DEBUG] MainContentController.initView()");

        const stepModel = Model.getStepModel();
        const feedbackData = stepModel.getFeedbackData();

        // console.log("[DEBUG] feedbackData: " + JSON.stringify(feedbackData));
        // END DEBUG

        let html = stepModel.getContentHtml();

        if (stepModel.isTaggedAsFeedback()) {

            // console.log("[DEBUB] [MainContentController]: StepModel.isTaggedAsFeedback = true");

            const feedbackHtml = MainContentView.generateFeedbackHtml(feedbackData);

            // console.log("[DEBUG] [MainContentController]: feedbackHtml: " + feedbackHtml);

            html = html + feedbackHtml;
        }

        // MainContentView.showMainContent(StepModel.getContentHtml());
        ScrollUpController.hide();
        MainContentView.showMainContent(html);
        MainContentView.scrollUpHard();
        MainContentController.updateViewFormData();

        GeneralAlertController.hide();

    }

    private static updateViewFormData(): void {

        const stepModel = Model.getStepModel();
        const formDataModel: FormDataModel = stepModel.getFormDataModel();

        if (formDataModel.hasInPageScope()) {
            const formDataPageScope = formDataModel.getInPageScope();
            FormDataUpdater.refreshView(formDataPageScope);
        }

        if (formDataModel.hasInProgramGenericScope()) {
            const formDataProgramGenericScope = formDataModel.getInProgramGenericScope();
            FormDataUpdater.refreshView(formDataProgramGenericScope);
        }

        const scopeIds: Array<string> = stepModel.getAllProgramScopeIds();
        for (let scopeId of scopeIds) {
                const formDataProgramNamedScope = formDataModel.getInProgramNamedScope(scopeId);
                FormDataUpdater.refreshView(formDataProgramNamedScope);
        }

        if (formDataModel.hasSentExercise()) MainContentView.disableForm();
    }

}