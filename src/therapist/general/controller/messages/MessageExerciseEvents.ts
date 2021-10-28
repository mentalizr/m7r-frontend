export class MessageExerciseEvents {

    public static showExerciseEvent(patientId: string, exerciseId: string): void {
        console.log("Show exercise [" + exerciseId + "] for patient [" + patientId + "]");
    }

    public static sendFeedback(patientId: string, exerciseId: string, feedbackTextareaId: string): void {
        const feedbackText: string = (<HTMLInputElement>document.getElementById(feedbackTextareaId)).value;
        console.log("Send feedback for patient [" + patientId + "], exercise [" + exerciseId + "], feedback: [" + feedbackText + "].");
    }

}