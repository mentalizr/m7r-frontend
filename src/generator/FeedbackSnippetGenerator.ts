import {Model} from "../patient/general/model/Model";

export class FeedbackSnippetGenerator {

    public static generateFeedback(feedbackText: string): string {
        let html: string = "";
        html += "<p class=\"h3 mt-4 mb-4\">Feedback von Ihrer Therapeutin oder Ihrem Therapeuten</p>\n" +
            "<div class=\"card border-secondary bg-white mb-4\">\n" +
            "    <div class=\"card-body m7r-patient-feedback-text\">" + feedbackText + "</div>\n" +
            "</div>\n";

        if (!Model.getProgramModel().isBlockingMode())
            html = html + "<p>Klicken Sie auf <em>Weiter</em>, um zum n&auml;chsten Schritt zu gelangen. </p>";

        return html;
    }

    public static generateNoFeedbackYet() {
        let html: string = "";
        html += "<p class=\"h3 mt-4 mb-4\">Feedback von Ihrer Therapeutin oder Ihrem Therapeuten</p>\n" +
            "<div class=\"alert alert-primary mb-4\">\n" +
            "    Ein Feedback liegt noch nicht vor!\n" +
            "</div>\n";

        if (!Model.getProgramModel().isBlockingMode())
            html = html + "<p>Klicken Sie auf <em>Weiter</em>, um zum n&auml;chsten Schritt zu gelangen. </p>";

        return html;
    }

}