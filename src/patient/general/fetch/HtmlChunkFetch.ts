import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";
import {ErrorHandler} from "../../../general/error/ErrorHandler";

const SERVICE_NAME = "htmlChunk";
const SERVICE_PARAMETER = "login";

export class HtmlChunkFetch {

    private service: string;
    private chunkName: string;
    private htmlChunk: string;

    constructor(chunkName: string) {
        this.chunkName = chunkName;
        this.service = SERVICE_BASE + "/" + SERVICE_NAME + "/" + chunkName;
    }

    public execute() {

        return fetch(this.service, {credentials: "include"})
            .then(response => {
                const serviceName: string = SERVICE_NAME + "/" + SERVICE_PARAMETER;
                return RestResponse.check(serviceName, response);
            })
            .then(response => response.text())
            .then(data => {
                this.htmlChunk = data;
            })
            .catch((error) => {
                // TODO Errorhandling by modal does not work here
                ErrorHandler.handleError(error);
                // return Promise.reject(new FetchResponseError(SERVICE_NAME, error.status, error.statusText));
            });
    }

    public getHtmlChunk(): string {
        return this.htmlChunk;
    }

}