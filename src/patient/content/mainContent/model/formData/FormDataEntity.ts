import {Exercise, FormData} from "./FormData";

export class FormDataEntity {

    private readonly formData: FormData;

    constructor(formData: FormData) {
        this.formData = formData;
    }

    public getFormData(): FormData {
        return this.formData;
    }

    public hasSentExercise(): boolean {
        return this.formData.exercise != null && this.formData.exercise.sent;
    }

    public isFeedback(): boolean {
        return this.formData.feedback != null;
    }

    public getFeedbackText(): string {
        if (!this.isFeedback()) throw new Error("Illegal state. FormData has no feedback.");
        return this.formData.feedback.text;
    }

}