import {Program, Step} from "../entities/Program";

export class ProgramStepper {

    private readonly program: Program;
    private readonly stepList: Array<Step>;
    private currentIndex: number;

    constructor(program: Program) {
        this.program = program;
        this.stepList = new Array<Step>();
        for (let module of program.modules) {
            for (let submodule of module.submodules) {
                for (let step of submodule.steps) {
                    this.stepList.push(step);
                }
            }
        }
        this.currentIndex = 0;
    }

    public getProgram(): Program {
        return this.program;
    }

    public getProgramId(): string {
        return this.program.id;
    }

    public getProgramName(): string {
        return this.program.name;
    }

    public isBlockingMode(): boolean {
        return this.program.blocking;
    }

    public isLastStep(): boolean {
        return (this.stepList.length == this.currentIndex + 1);
    }

    public hasNextStep(): boolean {
        return !this.isLastStep();
    }

    public hasPreviousStep(): boolean {
        return this.currentIndex > 0;
    }

    public getCurrentStepId(): string {
        return this.stepList[this.currentIndex].id;
    }

    public hasAccessibleNextStep(): boolean {
        if (!this.hasNextStep()) return false;
        if (!this.isBlockingMode()) return true;
        return this.stepList[this.currentIndex + 1].accessible;
    }

    public isCurrentStepFeedback(): boolean {
        return this.stepList[this.currentIndex].feedback;
    }

    public isCurrentStepExercise(): boolean {
        return this.stepList[this.currentIndex].exercise;
    }

    public stepForward(): void {
        if (!this.hasAccessibleNextStep()) throw new Error("Illegal state: unchecked stepForward performed.");
        this.currentIndex++;
    }

    public stepBackwards(): void {
        if (!this.hasPreviousStep()) throw new Error("Illegal state: unchecked stepBackwards.");
        this.currentIndex--;
    }

    public gotoStep(stepId: string) {
        for (let i = 0; i < this.stepList.length; i++) {
            const step = this.stepList[i];
            if (step.id == stepId) {
                this.currentIndex = i;
                return;
            }
        }
        throw new Error("Step with stepId [" + stepId + "] not found.");
    }

    public getFirstStepIdOfSubmodule(submoduleId: string) {
        for (let module of this.program.modules) {
            for (let submodule of module.submodules) {
                if (submodule.id == submoduleId) {
                    if (submodule.steps.length == 0) throw new Error("Submodule [" + submoduleId + "] has no steps.");
                    return submodule.steps[0].id;
                }
            }
        }
        throw new Error("No submodule found with id [" + submoduleId + "].");
    }

}