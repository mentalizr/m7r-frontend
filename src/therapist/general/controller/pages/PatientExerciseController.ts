import {ProgramContentService} from "../../rest/ProgramContentService";
import {AppStateTherapist} from "../../model/AppStateTherapist";
import {NavbarTherapistController} from "../NavbarTherapistController";
import {TherapistAppController} from "../../../TherapistAppController";
import {InputElementsRegistryFactory} from "../../../../patient/content/mainContent/model/InputElementsRegistry/InputElementsRegistryFactory";
import {InputElementsRegistry} from "../../../../patient/content/mainContent/model/InputElementsRegistry/InputElementsRegistry";
import {FormData} from "../../../../patient/content/mainContent/model/formData/FormData";
import {Model} from "../../../../patient/general/model/Model";
import {AbstractInputElement} from "../../../../patient/content/mainContent/model/InputElementsRegistry/AbstractInputElement";
import {FormDataService} from "../../rest/FormDataService";

const ID_MAIN_CONTENT = "main-content";

export class PatientExerciseController {

    private static inputElementsRegistry: InputElementsRegistry = undefined;

    public static initialize(patientId: string, contentId: string): Promise<any> {
        let programContentService = ProgramContentService.execute(contentId);
        let formDataService = FormDataService.execute(patientId, contentId);

        return Promise.all([programContentService, formDataService]).then(() => {
            PatientExerciseController.inputElementsRegistry
                = InputElementsRegistryFactory.getInstance(ProgramContentService.contentHtml);
            AppStateTherapist.setStateExercise(patientId, contentId);
            PatientExerciseController.render(contentId);
            PatientExerciseController.fillInFormData(FormDataService.formData);
            NavbarTherapistController.showArrowBack();
            NavbarTherapistController.hideRefreshButton();
            NavbarTherapistController.showPatient(patientId);
        });

        // return programContentService.then(function () {
        //     PatientExerciseController.inputElementsRegistry
        //         = InputElementsRegistryFactory.getInstance(ProgramContentService.contentHtml);
        //     AppStateTherapist.setStateExercise(patientId, contentId);
        //     PatientExerciseController.render(contentId);
        //     NavbarTherapistController.showArrowBack();
        //     NavbarTherapistController.hideRefreshButton();
        //     NavbarTherapistController.showPatient(patientId);
        // });
    }

    private static render(contentId: string) {
        TherapistAppController.cleanView();
        document.getElementById(ID_MAIN_CONTENT).innerHTML =
            "<p class=\"h3 mt-4 mb-4\">&Uuml;bung: " + contentId + "</p><hr>"
            + ProgramContentService.contentHtml;
    }

    private static fillInFormData(formData: FormData): void {

        for (let formDataList of formData.formElementDataList) {

            const id: string = formDataList.formElementId;
            const value: string = formDataList.formElementValue;

            if (!this.inputElementsRegistry.hasElement(id)) continue;

            let abstractInputElements: Set<AbstractInputElement>
                = this.inputElementsRegistry.getAbstractInputElements(id);
            for (let abstractInputElement of abstractInputElements) {
                abstractInputElement.setValue(value);
            }
        }

    }


}