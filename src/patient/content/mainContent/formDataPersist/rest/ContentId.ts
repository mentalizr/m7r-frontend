import {Model} from "../../../../general/model/Model";

export class ContentId {

    public static forPageScope(): string {
        return Model.getCurStepId();
    }

    public static forProgramGenericScope(): string {
        return Model.program.id + "_program-generic";
    }

    public static forProgramNamedScope(scopeId: string): string {
        return Model.program.id + "_program_" + scopeId;
    }

}