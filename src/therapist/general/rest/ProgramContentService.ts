import {SERVICE_BASE} from "../../../Globals";
import {RestResponse} from "../../../helper/RestResponse";

const SERVICE_NAME_PROGRAM_CONTENT = "therapist/programContent";

export class ProgramContentService {

    private static _service: string = undefined;
    public static contentHtml: string = undefined;

    public static execute(contentId: string) {

        ProgramContentService._service = SERVICE_BASE + "/" + SERVICE_NAME_PROGRAM_CONTENT + "/"
            + contentId;

        return fetch(ProgramContentService._service, {credentials: "include"})
            .then(ProgramContentService.status)
            .then(ProgramContentService.asText)
            .then(ProgramContentService.updateModel);
    }

    private static status(response) {
        return RestResponse.check(SERVICE_NAME_PROGRAM_CONTENT, response);
    }

    private static asText(response) {
        return response.text();
    }

    private static updateModel(contentHtml: string) {
        ProgramContentService.contentHtml = contentHtml;
    }

}
