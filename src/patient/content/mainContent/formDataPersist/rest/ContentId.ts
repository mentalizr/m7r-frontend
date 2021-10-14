import {Model} from "../../../../general/model/Model";

export class ContentId {

    public static forPageScope(): string {
        return Model.programStepper.getCurrentStepId();
    }

    public static forProgramGenericScope(): string {
        return Model.programStepper.getProgramId() + "_program-generic";
    }

    public static forProgramNamedScope(scopeId: string): string {
        return Model.programStepper.getProgramId() + "_program_" + scopeId;
    }

}