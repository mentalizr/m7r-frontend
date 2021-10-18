import {Program} from "../entities/Program";
import {AppConfigPatient} from "../../appFrame/model/AppConfigPatient";
import {User} from "../entities/User";
import {ProgramModel} from "./ProgramModel";
import {InfotextStatus} from "./InfotextStatus";
import {StepModel} from "../../content/mainContent/model/StepModel";

export class Model {

    public static appConfigPatient: AppConfigPatient = undefined;
    public static therapist: User = undefined;
    public static user: User = undefined;
    private static programModel: ProgramModel = undefined;
    private static infotextStatus : InfotextStatus = undefined;
    private static stepModel: StepModel = undefined;

    public static updateProgram(program: Program): void {
        // console.log("[Model]: initialize");
        // console.log("    " + JSON.stringify(program));
        Model.programModel = new ProgramModel(program);
        Model.infotextStatus = new InfotextStatus(program);
    }

    public static getProgramModel(): ProgramModel {
        if (Model.programModel == undefined) throw new Error("Illegal state. Program model not initialized yet.");
        return Model.programModel;
    }

    public static getInfotextStatus(): InfotextStatus {
        if (Model.infotextStatus == undefined) throw new Error("Illegal state. Infotext status not initialized yet.");
        return Model.infotextStatus;
    }

    public static updateStepModel(contentHtml: string) {
        Model.stepModel = new StepModel(contentHtml);
    }

    public static getStepModel(): StepModel {
        if (Model.stepModel == undefined) throw new Error("Illegal state. Step model not initialized yet.");
        return Model.stepModel;
    }

}