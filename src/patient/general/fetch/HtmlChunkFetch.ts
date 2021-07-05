import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";
import {FetchResponseError} from "../../content/mainContent/formDataPersist/rest/FetchResponseError";

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
            .then(response => response.text())
            .then(data => {
                this.htmlChunk = data;
            })
            .catch((error) => {
                return Promise.reject(new FetchResponseError(SERVICE_NAME, error.status, error.statusText));
            });
    }

    public getHtmlChunk(): string {
        return this.htmlChunk;
    }

    private status(response: Response): Promise<unknown> {
        const serviceName: string = SERVICE_NAME + "/" + SERVICE_PARAMETER;
        return RestResponse.check(serviceName, response);
    }

    private asText(response: Response): Promise<string> {
        return response.text();
    }

}