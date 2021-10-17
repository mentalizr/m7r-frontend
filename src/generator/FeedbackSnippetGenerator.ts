export class FeedbackSnippetGenerator {

    public static generateFeedback(feedbackText: string): string {
        let html: string = "";
        html += "<p class=\"h3 mt-4 mb-4\">Feedback von Ihrer Therapeutin oder Ihrem Therapeuten</p>\n" +
            "<div class=\"card border-secondary bg-white mb-4\">\n" +
            "    <div class=\"card-body\">\n" +
            feedbackText + "\n" +
            "    </div>\n" +
            "</div>\n" +
            "<p>Klicken Sie auf <em>Weiter</em>, um zum n&auml;chsten Schritt zu gelangen. </p>";
        return html;
    }

    public static generateFeedbackDom(feedbackText: string): HTMLElement {
        let html: string = "";
        html += "<p class=\"h3 mt-4 mb-4\">Feedback von Ihrer Therapeutin oder Ihrem Therapeuten</p>\n" +
            "<div class=\"card border-secondary bg-white mb-4\">\n" +
            "    <div class=\"card-body\">\n" +
            feedbackText + "\n" +
            "    </div>\n" +
            "</div>\n" +
            "<p>Klicken Sie auf <em>Weiter</em>, um zum n&auml;chsten Schritt zu gelangen. </p>";

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body;
    }

    public static generateNoFeedbackYet() {
        let html: string = "";
        html += "<p class=\"h3 mt-4 mb-4\">Feedback von Ihrer Therapeutin oder Ihrem Therapeuten</p>\n" +
            "<div class=\"alert alert-primary mb-4\">\n" +
            "    Ein Feedback liegt noch nicht vor!\n" +
            "</div>\n" +
            "<p>Klicken Sie auf <em>Weiter</em>, um zum n&auml;chsten Schritt zu gelangen. </p>";
        return html;
    }

    public static generateNoFeedbackYetDom(): HTMLElement {
        let html: string = "";
        html += "<p class=\"h3 mt-4 mb-4\">Feedback von Ihrer Therapeutin oder Ihrem Therapeuten</p>\n" +
            "<div class=\"alert alert-primary mb-4\">\n" +
            "    Ein Feedback liegt noch nicht vor!\n" +
            "</div>\n" +
            "<p>Klicken Sie auf <em>Weiter</em>, um zum n&auml;chsten Schritt zu gelangen. </p>";

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body;
    }



}