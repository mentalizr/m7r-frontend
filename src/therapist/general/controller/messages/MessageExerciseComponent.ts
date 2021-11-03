import {AbstractMessageComponent} from "./AbstractMessageComponent";
import {PatientMessage, PatientMessageExercise} from "../../entities/PatientMessages";
import {ID_NEXT_BUTTON} from "../../../../patient/content/buttonBar/ButtonBarIDs";
import {MessageExerciseEvents} from "./MessageExerciseEvents";

export class MessageExerciseComponent extends AbstractMessageComponent {

    public exerciseId: string;
    public patientId: string;
    public exerciseName: string;
    public hasFeedback: boolean;
    public date: string;

    constructor(patientMessage: PatientMessage) {
        const patientMessageExercise: PatientMessageExercise = patientMessage.patientMessageExercise;
        super(patientMessageExercise.messageId);
        this.exerciseId = patientMessageExercise.exerciseId;
        this.patientId = patientMessageExercise.senderId;
        // TODO show exercise name instead of id
        this.exerciseName = patientMessageExercise.exerciseId;
        this.hasFeedback = patientMessageExercise.hasFeedback;
        this.date = patientMessageExercise.date;
    }

    getTemplateName(): string {
        return "message-exercise-template";
    }

    registerEvents() {
        console.log("register events for MessageExercise, exerciseId: [" + this.exerciseId + "].");
        this.registerShowExerciseEvent();
        if (!this.hasFeedback) this.registerSendFeedbackEvent();
    }

    private registerShowExerciseEvent(): void {
        const idShowExercise: string = "button-show-exercise-" + this.messageId;
        const patientId: string = this.patientId;
        const exerciseId: string = this.exerciseId;
        document.getElementById(idShowExercise).addEventListener("click", function() {
            MessageExerciseEvents.showExerciseEvent(patientId, exerciseId);
        });
    }

    private registerSendFeedbackEvent(): void {
        const idButtonSendFeedback: string = "button-send-feedback-" + this.messageId;
        const patientId: string = this.patientId;
        const exerciseId: string = this.exerciseId;
        const idTextareaFeedback: string = "textarea-feedback-" + this.messageId;
        document.getElementById(idButtonSendFeedback).addEventListener("click", function () {
            MessageExerciseEvents.sendFeedback(patientId, exerciseId, idTextareaFeedback);
        });
    }

}