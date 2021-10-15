import {Model} from "../../../../general/model/Model";

export class ContentId {

    public static forPageScope(): string {
        return Model.getProgramModel().getCurrentStepId();
    }

    public static forProgramGenericScope(): string {
        return Model.getProgramModel().getProgramId() + "_program-generic";
    }

    public static forProgramNamedScope(scopeId: string): string {
        return Model.getProgramModel().getProgramId() + "_program_" + scopeId;
    }

}