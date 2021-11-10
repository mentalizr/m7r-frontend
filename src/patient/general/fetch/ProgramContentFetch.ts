import {SERVICE_BASE} from "../../../Globals";
import {Model} from "../model/Model";
import {RestResponse} from "../../../helper/RestResponse";

const SERVICE_NAME_PROGRAM_CONTENT = "patient/programContent";

export class ProgramContentFetch {

    private static _service: string = undefined;

    public static execute() {

        const contentId: string = this.obtainContentId();

        ProgramContentFetch._service = SERVICE_BASE + "/" + SERVICE_NAME_PROGRAM_CONTENT + "/" + contentId;

        return fetch(ProgramContentFetch._service, {credentials: "include"})
            .then(ProgramContentFetch.status)
            .then(ProgramContentFetch.asText)
            .then(ProgramContentFetch.updateModel);
    }

    private static obtainContentId(): string {
        if (Model.getInfotextStatus().isInfotextDisplayed()) {
            return Model.getInfotextStatus().getCurrentInfotextId();
        } else {
            return Model.getProgramModel().getCurrentStepId();
        }
    }

    private static status(response) {
        return RestResponse.check(SERVICE_NAME_PROGRAM_CONTENT, response);
    }

    private static asText(response) {
        return response.text();
    }

    private static updateModel(contentHtml: string) {
        Model.updateStepModel(contentHtml);
    }

}