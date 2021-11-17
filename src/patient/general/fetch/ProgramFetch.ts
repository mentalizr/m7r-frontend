import {Model} from "../model/Model";
import {SERVICE_BASE} from "../../../Globals";
import {FormDataFetchHelper} from "../../content/mainContent/formDataPersist/rest/FormDataFetchHelper";
import {RestResponse} from "../../../helper/RestResponse";
import {Program} from "../entities/Program";
import {PatientStatusFetch} from "./PatientStatusFetch";
import {ErrorHandler} from "../../../general/error/ErrorHandler";

const SERVICE_NAME = "patient/program";

export class ProgramFetch {

    public static execute() {

        const service: string = SERVICE_BASE + "/" + SERVICE_NAME;

        return fetch(service, {credentials: "include"})
            .then(ProgramFetch.status)
            .then(ProgramFetch.json)
            .then(ProgramFetch.updateModel)
            .catch(ErrorHandler.handleError);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

    private static updateModel(program: Program) {
        if (PatientStatusFetch.hasLastContentId()) {
            const lastContentId: string = PatientStatusFetch.getLastContentId();
            Model.updateProgramWithContentId(program, lastContentId);
        } else {
            Model.updateProgram(program);
            // console.log("ProgramFetch. Model updated.");
        }
    }

}