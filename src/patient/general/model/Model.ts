import {Program} from "../entities/Program";
import {AppConfigPatient} from "../../appFrame/model/AppConfigPatient";
import {User} from "../entities/User";
import {ProgramStepper} from "./ProgramStepper";
import {InfotextStatus} from "./InfotextStatus";

export class Model {

    public static appConfigPatient: AppConfigPatient;
    public static therapist: User = undefined;
    public static user: User = undefined;
    public static programStepper: ProgramStepper;
    public static infotextStatus : InfotextStatus;

    public static initialize(program: Program): void {

        // console.log("[Model]: initialize");
        // console.log("    " + JSON.stringify(program));

        Model.programStepper = new ProgramStepper(program);
        Model.infotextStatus = new InfotextStatus(program);
    }

}