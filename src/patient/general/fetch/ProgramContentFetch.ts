import {SERVICE_BASE} from "../../../Globals";
import {Model} from "../model/Model";
import {StepModel} from "../../content/mainContent/model/StepModel";
import {RestResponse} from "../../../helper/RestResponse";

const SERVICE_NAME_PROGRAM_CONTENT = "programContent";
const SERVICE_NAME_INFO_CONTENT = "programInfoContent";

export class ProgramContentFetch {

    private static _service: string = undefined;

    public static execute() {

        if (Model.infotextStatus.isInfotextDisplayed()) {
            ProgramContentFetch._service = SERVICE_BASE + "/" + SERVICE_NAME_INFO_CONTENT + "/" + Model.infotextStatus.getCurrentInfotextId();
        } else {
            ProgramContentFetch._service = SERVICE_BASE + "/" + SERVICE_NAME_PROGRAM_CONTENT + "/" + Model.programStepper.getCurrentStepId();
        }

        return fetch(ProgramContentFetch._service, {credentials: "include"})
            .then(ProgramContentFetch.status)
            .then(ProgramContentFetch.asText)
            .then(ProgramContentFetch.updateModel);
    }

    private static status(response) {
        const serviceName: string = SERVICE_NAME_PROGRAM_CONTENT + " or " + SERVICE_NAME_INFO_CONTENT;
        return RestResponse.check(serviceName, response);
    }

    private static asText(response) {
        return response.text();
    }

    private static updateModel(contentHtml: string) {
        StepModel.initialize(contentHtml);
        // console.log("contentHtml: " + ProgramContentFetch._programContentHtml);
    }

}