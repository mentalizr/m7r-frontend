import {FeedbackSubmission} from "../../entities/FeedbackSubmission";
import {SplashController} from "../../../../general/controller/SplashController";
import {SubmitFeedbackService} from "../../rest/SubmitFeedbackService";
import {TherapistAppController} from "../../../TherapistAppController";
import {PatientExerciseController} from "../PatientExerciseController";

export class MessageExerciseEvents {

    public static showExerciseEvent(patientId: string, exerciseId: string): void {
        console.log("Show exercise [" + exerciseId + "] for patient [" + patientId + "]");

        SplashController.show();
        PatientExerciseController.initialize(patientId, exerciseId)
            .then(() => {
                SplashController.hide();
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
                TherapistAppController.refreshAppTherapist(false)
                    .then(function () {
                        SplashController.hide();
                    });
            });
    }

}