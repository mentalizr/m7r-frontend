import {AbstractMessageComponent} from "./AbstractMessageComponent";
import {PatientMessage, PatientMessageExercise} from "../../entities/PatientMessages";

export class MessageExerciseComponent extends AbstractMessageComponent {

    public exerciseName: string;
    public hasFeedback: boolean;
    public date: string;

    constructor(patientMessage: PatientMessage) {
        super();
        const patientMessageExercise: PatientMessageExercise = patientMessage.patientMessageExercise;
        this.exerciseName = patientMessageExercise.exerciseId;
        this.hasFeedback = patientMessageExercise.hasFeedback;
        this.date = patientMessageExercise.date;
    }

    getTemplateName(): string {
        return "message-exercise-template";
    }

}