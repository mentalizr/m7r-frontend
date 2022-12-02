import {SERVICE_BASE} from "../Globals";
import {RestResponse} from "../helper/RestResponse";
import {SessionStatusEntity} from "../patient/general/entities/SessionStatusEntity";
import {SessionStatus} from "../patient/general/entities/SessionStatus";

const SERVICE_NAME = "generic/consentPolicy";

export class ConsentPolicyFetch {

    private static _service: string = SERVICE_BASE + "/" + SERVICE_NAME;
    private static responseString: string;

    public static execute(): Promise<void> {
        return fetch(ConsentPolicyFetch._service, {credentials: "include"})
            .then(ConsentPolicyFetch.status)
            .then(ConsentPolicyFetch.updateModel);
    }

    public static getResponseString(): string {
        return ConsentPolicyFetch.responseString;
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static updateModel(data) {
        ConsentPolicyFetch.responseString = data;
    }

}