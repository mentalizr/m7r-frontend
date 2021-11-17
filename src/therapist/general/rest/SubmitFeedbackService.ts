import {FeedbackSubmission} from "../entities/FeedbackSubmission";
import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";
import {ErrorHandler} from "../../../general/error/ErrorHandler";

const SERVICE_NAME = "therapist/submitFeedback";

export class SubmitFeedbackService {

    public static execute(feedbackSubmission: FeedbackSubmission): Promise<unknown> {

        const formDataJSON: string = JSON.stringify(feedbackSubmission);
        const serviceUrl = SERVICE_BASE + "/" + SERVICE_NAME;

        console.log("FeedbackSubmission serviceUrl: " + serviceUrl);
        console.log("feedbackSubmission: " + formDataJSON);

        return fetch(serviceUrl,
            {
                credentials: "include",
                method: "post",
                headers: {"Content-type": "application/json; charset=utf-8"},
                body: formDataJSON
            },
        )
            .then(SubmitFeedbackService.checkStatus)
            .catch(ErrorHandler.handleError);
    }

    private static checkStatus(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

}