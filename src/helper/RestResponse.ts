import {FetchResponseError} from "../patient/content/mainContent/formDataPersist/rest/FetchResponseError";

export class RestResponse {

    public static check(serviceName: string, response: Response): Promise<unknown> {
        if (response.ok) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new FetchResponseError(serviceName, response.status, response.statusText));
        }
    }

}