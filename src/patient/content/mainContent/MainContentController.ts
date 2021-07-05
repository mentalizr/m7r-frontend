import {StepModel} from "./model/StepModel";
import {MainContentView} from "./MainContentView";
import {GeneralAlertController} from "../generalAlert/GeneralAlertController";
import {FormDataUpdater} from "./formDataPersist/FormDataUpdater";
import {FormDataModel} from "./model/formData/FormDataModel";
import {ScrollUpController} from "../../general/controller/ScrollUpController";

export class MainContentController {

    public static updateView(): void {

        // console.log("[DEBUG] MainContentController.initView()");

        const feedbackData = StepModel.getFeedbackData();
        // console.log("[DEBUG] feedbackData: " + JSON.stringify(feedbackData));
        // END DEBUG

        let html = StepModel.getContentHtml();

        if (StepModel.isTaggedAsFeedback()) {

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

        const formDataModel: FormDataModel = StepModel.getFormDataModel();

        if (formDataModel.hasInPageScope()) {
            const formDataPageScope = formDataModel.getInPageScope();
            FormDataUpdater.refreshView(formDataPageScope);
        }

        if (formDataModel.hasInProgramGenericScope()) {
            const formDataProgramGenericScope = formDataModel.getInProgramGenericScope();
            FormDataUpdater.refreshView(formDataProgramGenericScope);
        }

        const scopeIds: Array<string> = StepModel.getAllProgramScopeIds();
        for (let scopeId of scopeIds) {
                const formDataProgramNamedScope = formDataModel.getInProgramNamedScope(scopeId);
                FormDataUpdater.refreshView(formDataProgramNamedScope);
        }

        // TODO: rework feedback
        // const formDataPageScope = formDataModel.getInPageScope();
        // if (formDataPageScope.editable == false) {
        //     MainContentView.disableForm();
        // }
    }

}