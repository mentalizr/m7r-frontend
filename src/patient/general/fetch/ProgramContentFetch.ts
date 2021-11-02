import {SERVICE_BASE} from "../../../Globals";
import {Model} from "../model/Model";
import {RestResponse} from "../../../helper/RestResponse";

const SERVICE_NAME_PROGRAM_CONTENT = "patient/programContent";
// const SERVICE_NAME_INFO_CONTENT = "programInfoContent";

export class ProgramContentFetch {

    private static _service: string = undefined;

    public static execute() {

        ProgramContentFetch._service = SERVICE_BASE + "/" + SERVICE_NAME_PROGRAM_CONTENT + "/"
            + Model.getProgramModel().getCurrentStepId();

        // if (Model.getInfotextStatus().isInfotextDisplayed()) {
        //     ProgramContentFetch._service = SERVICE_BASE + "/" + SERVICE_NAME_INFO_CONTENT + "/"
        //         + Model.getInfotextStatus().getCurrentInfotextId();
        // } else {
        //     ProgramContentFetch._service = SERVICE_BASE + "/" + SERVICE_NAME_PROGRAM_CONTENT + "/"
        //         + Model.getProgramModel().getCurrentStepId();
        // }

        return fetch(ProgramContentFetch._service, {credentials: "include"})
            .then(ProgramContentFetch.status)
            .then(ProgramContentFetch.asText)
            .then(ProgramContentFetch.updateModel);
    }

    private static status(response) {
        // const serviceName: string = SERVICE_NAME_PROGRAM_CONTENT + " or " + SERVICE_NAME_INFO_CONTENT;
        return RestResponse.check(SERVICE_NAME_PROGRAM_CONTENT, response);
    }

    private static asText(response) {
        return response.text();
    }

    private static updateModel(contentHtml: string) {
        Model.updateStepModel(contentHtml);
    }

}