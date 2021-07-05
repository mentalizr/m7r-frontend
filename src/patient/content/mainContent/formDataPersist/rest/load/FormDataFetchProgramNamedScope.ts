import {SERVICE_BASE} from "../../../../../../Globals";
import {Model} from "../../../../../general/model/Model";
import {FormData} from "../../../model/formData/FormData";
import {FormDataFetchHelper} from "../FormDataFetchHelper";
import {StepModel} from "../../../model/StepModel";
import {ContentId} from "../ContentId";
import {RestResponse} from "../../../../../../helper/RestResponse";

const SERVICE_NAME = "formData";

export class FormDataFetchProgramNamedScope {

    public static execute(): Promise<unknown> {

        const programScopeIds: Array<string> = StepModel.getAllProgramScopeIds();

        let fetchPromises: Array<Promise<unknown>> = FormDataFetchProgramNamedScope.buildArrayOfFetchPromises(programScopeIds);

        return Promise.all(fetchPromises)
            .then(responseJsonArray => {
                FormDataFetchProgramNamedScope.processResponse(responseJsonArray, programScopeIds);
            });
    }

    private static processResponse(responseJsonArray: unknown[], programScopeIds: Array<string>) {

        for (let i = 0; i < responseJsonArray.length; i++) {

            let programScopeId: string = programScopeIds[i];
            // console.log("[" + FormDataFetchProgramNamedScope.name + "] " + programScopeId + " " + JSON.stringify(responseJsonArray[i]));

            let formData: FormData = <FormData>responseJsonArray[i];
            FormDataFetchProgramNamedScope.updateModel(programScopeId, formData);
        }
    }

    private static updateModel(programScopeId: string, formData: FormData) {

        if (FormDataFetchHelper.isEmpty(formData)) {
            formData = FormDataFetchHelper.createFormDataEnvelope(FormDataFetchProgramNamedScope.getContentId(programScopeId));
        }

        FormDataFetchProgramNamedScope.addToFromDataModel(programScopeId, formData);
        // console.log("[" + FormDataFetchProgramNamedScope.name + "] " + JSON.stringify(formData));
    }

    private static addToFromDataModel(programScopeId: string, formData: FormData) {
        StepModel.getFormDataModel().addInProgramNamedScope(programScopeId, formData);
    }

    private static buildArrayOfFetchPromises(programScopeIds: Array<string>): Array<Promise<unknown>> {

        let fetchPromises: Array<Promise<unknown>> = [];
        for (let programScopeId of programScopeIds) {

            const serviceUrl = FormDataFetchProgramNamedScope.getServiceUrl(programScopeId);
            // console.log("[" + FormDataFetchProgramNamedScope.name + "] Fetch from: " + serviceUrl);

            fetchPromises.push(
                fetch(serviceUrl, {credentials: "include"})
                    .then(FormDataFetchProgramNamedScope.status)
                    .then(FormDataFetchProgramNamedScope.json)
            );
        }
        return fetchPromises;
    }

    private static getServiceUrl(programScopeId: string) {
        const contentId = FormDataFetchProgramNamedScope.getContentId(programScopeId);
        return SERVICE_BASE + "/" + SERVICE_NAME + "/" + contentId;
    }

    private static getContentId(programScopeId: string): string {
        return ContentId.forProgramNamedScope(programScopeId);
    }

    private static status(response): Promise<unknown> {
        return RestResponse.check(SERVICE_NAME, response);
    }

    private static json(response): Promise<unknown> {
        return response.json();
    }

}