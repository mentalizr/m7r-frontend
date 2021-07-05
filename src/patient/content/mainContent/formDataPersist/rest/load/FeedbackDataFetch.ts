import {SERVICE_BASE} from "../../../../../../Globals";
import {Model} from "../../../../../general/model/Model";
import {FeedbackData} from "../../../model/formData/FeedbackData";
import {FormDataFetchHelper} from "../FormDataFetchHelper";
import {RestResponse} from "../../../../../../helper/RestResponse";

const SERVICE_NAME = "feedbackData";

export class FeedbackDataFetch {

    private static _feedbackData: FeedbackData = undefined;

    public static execute() {

        if (!Model.hasPreviousContentStep()) {
            return Promise.resolve();
        }

        const serviceUrl = FeedbackDataFetch.getServiceUrl();

        return fetch(serviceUrl, {credentials: "include"})
            .then(FeedbackDataFetch.status)
            .then(FeedbackDataFetch.json)
            .then(FeedbackDataFetch.saveData);
    }

    private static getServiceUrl() {
        return SERVICE_BASE + "/" + SERVICE_NAME + "/" + FeedbackDataFetch.getContentId();
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static saveData(data) {
        FeedbackDataFetch._feedbackData = data;
    }

    public static getFeedbackData(): FeedbackData {
        return FeedbackDataFetch._feedbackData;
    }

    private static getContentId(): string {
        return Model.getPreviousStepId();
    }

}