import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";

const SERVICE_NAME = "htmlChunk";
const SERVICE_PARAMETER = "login";

export class HtmlChunkLoginFetch {

    private static _service: string = SERVICE_BASE + "/" + SERVICE_NAME + "/" + SERVICE_PARAMETER;

    public static execute() {

        return fetch(HtmlChunkLoginFetch._service, {credentials: "include"})
            .then(HtmlChunkLoginFetch.status)
            .then(HtmlChunkLoginFetch.asText)
            .then(HtmlChunkLoginFetch.updateModel);
    }

    private static status(response) {
        const serviceName: string = SERVICE_NAME + "/" + SERVICE_PARAMETER;
        return RestResponse.check(serviceName, response);
    }

    private static asText(response) {
        return response.text();
    }

    private static updateModel(contentHtml: string) {
        // TODO
        // StepModel.initialize(contentHtml);
        console.log("contentHtml: " + contentHtml);
    }

}