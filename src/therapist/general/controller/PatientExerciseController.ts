import {ProgramContentService} from "../rest/ProgramContentService";
import {AppStateTherapist} from "../model/AppStateTherapist";
import {NavbarTherapistController} from "./NavbarTherapistController";
import {TherapistAppController} from "../../TherapistAppController";

const ID_MAIN_CONTENT = "main-content";

export class PatientExerciseController {

    public static initialize(patientId: string, contentId: string): Promise<any> {
        let programContentService = ProgramContentService.execute(contentId);

        return programContentService.then(function () {
            AppStateTherapist.setStateExercise(patientId, contentId);
            PatientExerciseController.render(patientId, contentId);
            NavbarTherapistController.showArrowBack();
            NavbarTherapistController.showPatient(patientId);
        });
    }

    private static render(patientId: string, contentId: string) {
        TherapistAppController.cleanView();
        document.getElementById(ID_MAIN_CONTENT).innerHTML =
            "<p>Here the exercise for: " + patientId + " contentId: " + contentId + "</p>"
            + ProgramContentService.contentHtml;
    }

}