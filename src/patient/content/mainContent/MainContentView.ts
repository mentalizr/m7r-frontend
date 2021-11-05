import {CSS_CLASS_NS_INPUT, CSS_CLASS_NS_RADIOGROUP, ID_MAIN_CONTENT} from "../../../Globals";
import {Fader} from "../../../helper/Fader";
import {Model} from "../../general/model/Model";
import {FeedbackSnippetGenerator} from "../../../generator/FeedbackSnippetGenerator";

export class MainContentView {

    public static showMainContent(contentHtml: string): void {

        let mainContentElement: HTMLElement = document.getElementById(ID_MAIN_CONTENT);
        Fader.hide(mainContentElement);
        mainContentElement.innerHTML = contentHtml;
        Fader.fadeIn(mainContentElement);
    }

    public static disableForm(): void {
        document.querySelectorAll("#" + ID_MAIN_CONTENT + " input").forEach(function (element) {
            element.setAttribute("disabled", "disabled");
        });
        document.querySelectorAll("." + CSS_CLASS_NS_INPUT).forEach(function (element) {
            element.setAttribute("disabled", "disabled");
        });
    }

    public static markTextfieldAsInvalid(id: string): void {
        document.getElementById(id).classList.add("is-invalid");
    }

    public static markAllButtonsAsInvalidForButtongroupId(id: string): void {
        document.querySelectorAll("#" + id + " input[type='radio']").forEach(function (element) {
            element.classList.add("is-invalid");
        });
    }

    public static clearAllValidationMarksOnInputFields(): void {
        document.querySelectorAll("#" + ID_MAIN_CONTENT + " .is-invalid").forEach(function (element) {
            element.classList.remove("is-invalid");
        });
    }

    public static selectAllRadioGroupsWhichNotChecked(): Set<HTMLElement> {
        let radioGroupElements: NodeListOf<HTMLElement> = document.querySelectorAll("#" + ID_MAIN_CONTENT + " ." + CSS_CLASS_NS_RADIOGROUP);
        let radioGroupsNotChecked: Set<HTMLElement> = new Set<HTMLElement>();

        radioGroupElements.forEach(function (htmlElement) {
            if (htmlElement.querySelectorAll("input[type='radio']:checked").length === 0) {
                radioGroupsNotChecked.add(htmlElement);
            }
        });

        return radioGroupsNotChecked;
    }

    public static generateFeedbackHtml(): string {
        if (Model.getStepModel().getFormDataModel().hasFeedback()) {
            const feedbackText: string = Model.getStepModel().getFormDataModel().getFeedbackText();
            return FeedbackSnippetGenerator.generateFeedback(feedbackText);
        } else {
            return FeedbackSnippetGenerator.generateNoFeedbackYet();
        }
    }

    public static scrollUpHard(): void {
        window.scrollTo(0, 0);
    }

}
