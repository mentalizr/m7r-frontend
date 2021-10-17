import {CSS_CLASS_NS_INPUT, CSS_CLASS_NS_RADIOGROUP, ID_MAIN_CONTENT} from "../../../Globals";
import {FeedbackData} from "./model/formData/FeedbackData";
import * as Mustache from "mustache";
import {Fader} from "../../../helper/Fader";
import {ScrollUpController} from "../../../general/controller/ScrollUpController";
import {FormData} from "./model/formData/FormData";
import {Model} from "../../general/model/Model";
import {FeedbackSnippetGenerator} from "../../../generator/FeedbackSnippetGenerator";

const ID_FEEDBACK_TEMPLATE = "feedback-template";
const ID_NO_FEEDBACK_TEMPLATE = "no-feedback-template";

export class MainContentView {

    public static showMainContent(contentHtml: string): void {

        let mainContentElement: HTMLElement = document.getElementById(ID_MAIN_CONTENT);
        Fader.hide(mainContentElement);
        mainContentElement.innerHTML = contentHtml;
        Fader.fadeIn(mainContentElement);
    }

    public static disableForm(): void {
        // TODO rework feedback

        // $("#" + ID_MAIN_CONTENT + " input").prop("disabled", "disabled");
        document.querySelectorAll("#" + ID_MAIN_CONTENT + " input").forEach(function (element) {
            element.setAttribute("disabled", "disabled");
        });

        // $("." + CSS_CLASS_NS_INPUT).prop("disabled", "disabled");
        document.querySelectorAll("." + CSS_CLASS_NS_INPUT).forEach(function (element) {
            element.setAttribute("disabled", "disabled");
        });
    }

    public static markTextfieldAsInvalid(id: string): void {
        // $("#" + id).addClass("is-invalid");
        document.getElementById(id).classList.add("is-invalid");
    }

    public static markAllButtonsAsInvalidForButtongroupId(id: string): void {
        // $("#" + id + " input[type='radio']").addClass("is-invalid");
        document.querySelectorAll("#" + id + " input[type='radio']").forEach(function (element) {
            element.classList.add("is-invalid");
        });
    }

    public static clearAllValidationMarksOnInputFields(): void {
        // $("#" + ID_MAIN_CONTENT + " .is-invalid").removeClass("is-invalid");
        document.querySelectorAll("#" + ID_MAIN_CONTENT + " .is-invalid").forEach(function (element) {
            element.classList.remove("is-invalid");
        });
    }

    // TODO rework feedback
    // public static selectAllRadioGroupsWhichNotChecked(): JQuery<HTMLElement> {
    public static selectAllRadioGroupsWhichNotChecked(): Set<HTMLElement> {
        // return $("#" + ID_MAIN_CONTENT + " ." + CSS_CLASS_NS_RADIOGROUP).not(":has(input[type='radio']:checked)");

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

    // TODO rework feedback
    // public static generateFeedbackHtml(feedbackData: FeedbackData): string {
    //
    //     // console.log("[DEBUG] [MainContentView]: generateFeedbackHtml aufgerufen!");
    //
    //     // console.log("[DEBUG] [MainContentView]: feedbackData = " + JSON.stringify(feedbackData));
    //
    //     if (feedbackData.userId && feedbackData.userId.length > 0) {
    //         // has feedback
    //         // let template_feedback = $("#" + ID_FEEDBACK_TEMPLATE).html();
    //         let template_feedback = document.getElementById(ID_FEEDBACK_TEMPLATE).innerHTML;
    //
    //         // console.log("[DEBUG] [MainContentView]: template_feedback = " + template_feedback);
    //         // console.log("[DEBUG] [MainContentView]: feedbackData = " + JSON.stringify(feedbackData));
    //
    //         return Mustache.render(template_feedback, feedbackData);
    //     }
    //
    //     // has no feedback
    //     // return $("#" + ID_NO_FEEDBACK_TEMPLATE).html();
    //     return document.getElementById(ID_NO_FEEDBACK_TEMPLATE).innerHTML;
    //
    //     // console.log("[DEBUG] [MainContentView]: renderedHtml: " + rendered_html);
    //
    //     // return rendered_html;
    // }

    public static scrollUpHard(): void {
        window.scrollTo(0, 0);
    }

}