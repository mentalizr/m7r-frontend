import {FeedbackSubmission} from "../../entities/FeedbackSubmission";
import {SplashController} from "../../../../general/controller/SplashController";
import {SubmitFeedbackService} from "../../rest/SubmitFeedbackService";
import {TherapistAppController} from "../../../TherapistAppController";
import {PatientExerciseController} from "../pages/PatientExerciseController";
import {BackdropSpinnerController} from "../../../../patient/general/controller/BackdropSpinnerController";
import {ErrorHandler} from "../../../../general/error/ErrorHandler";

export class MessageExerciseEvents {

    public static showExerciseEvent(patientId: string, exerciseId: string): void {
        console.log("Show exercise [" + exerciseId + "] for patient [" + patientId + "]");

        SplashController.show();
        PatientExerciseController.initialize(patientId, exerciseId)
            .then(() => {
                SplashController.hide();
            })
            .catch(function(error) {
                BackdropSpinnerController.hide();
                ErrorHandler.handleError(error);
            });
    }

    public static sendFeedback(patientId: string, exerciseId: string, feedbackTextareaId: string): Promise<unknown> {
        const feedbackText: string = (<HTMLInputElement>document.getElementById(feedbackTextareaId)).value;
        console.log("Send feedback for patient [" + patientId + "], exercise [" + exerciseId + "], " +
            "feedback: [" + feedbackText + "].");

        const feedbackTextTrimmed: string = feedbackText.trim();
        if (feedbackTextTrimmed == "") return Promise.resolve();

        let feedbackSubmission: FeedbackSubmission = {contentId: exerciseId, feedback: feedbackTextTrimmed, userId: patientId};

        SplashController.show();

        return SubmitFeedbackService.execute(feedbackSubmission)
            .then(function () {
                TherapistAppController.refreshAppTherapist()
                    .then(function () {
                        SplashController.hide();
                    });
            });
    }

}