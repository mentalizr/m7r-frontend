import {Program} from "../entities/Program";
import {StepIdList} from "./StepIdList";
import {Therapeut} from "../entities/Therapeut";
import {Patient} from "../entities/Patient";
import {Logger} from "../../../helper/Logger";
import {AppConfig} from "../../appFrame/model/AppConfig";
import {User} from "../entities/User";

export class Model {

    public static appConfig: AppConfig;
    public static program: Program;
    public static stepIdList: StepIdList;
    public static therapist: User = undefined;
    // public static patient: Patient = undefined;
    public static user: User = undefined;

    public static curStepIndex: number;
    public static curInfotextId: string = null;

    public static initialize(data: Program): void {

        // console.log("[Model]: initialize");
        // console.log("    " + JSON.stringify(data));

        Model.program = data;
        Model.stepIdList = new StepIdList(Model.program);
        Model.curStepIndex = 0;
    }

    public static getCurStepId(): string {
        return this.stepIdList.getStepId(this.curStepIndex);
    }

    public static hasNextContentStep(): boolean {
        let hasNext: boolean = Model.curStepIndex < Model.stepIdList.getNrOfSteps() - 1;

        // console.log("curStepIndex: " + Model.curStepIndex);
        // console.log("NrOfSteps: " + Model.stepIdList.getNrOfSteps());
        // console.log("hasNextContentStep? " + hasNext);

        return Model.curStepIndex < Model.stepIdList.getNrOfSteps() - 1;
    }

    public static hasPreviousContentStep(): boolean {
        return Model.curStepIndex > 0;
    }

    public static getPreviousStepId(): string {
        if (this.hasPreviousContentStep()) {
            return this.stepIdList.getStepId(Model.curStepIndex - 1);
        }
        Logger("Fehler: Aufruf von Model.getPreviousStep() auf erstem Step.");
    }

    public static isInfotextShown(): boolean {
        return Model.curInfotextId != null;
    }

    public static incStepIndex(): void {
        if (Model.hasNextContentStep()) {
            Model.curStepIndex++;
        } else {
            Logger("Aufruf von Model.incStepIndex() ohne folgenden Step.");
        }
    }

    public static decStepIndex(): void {
        if (Model.hasPreviousContentStep()) {
            Model.curStepIndex--;
        } else {
            Logger("Aufruf von Model.decStepIndex() ohne vorhergehenden Step.");
        }
    }

    public static getCurInfotextName(): string {

        if (!Model.isInfotextShown()) {
            Logger("Aufruf von Model.getCurInfotextName() ohne Anzeige eines Infotextes.");
            return "";
        }

        const infotexts = Model.program.infotexts;

        for (let i=0; i < infotexts.length; i++) {
            if (infotexts[i].id == Model.curInfotextId) {
                return infotexts[i].name;
            }
        }

        return "";
    }

    public static getInfotextIdForLinkId(infoLinkId): string {
        const infoNr = infoLinkId.substring(9, infoLinkId.length);
        const program = Model.program.id;
        return program + "__info_" + infoNr;
    }

    public static updateStatusInfotextShown(infotextId): void {
        Model.curInfotextId = infotextId;
    }

    public static updateStatusClearInfotext(): void {
        Model.curInfotextId = null;
    }

    public static updateStatus(stepId: string): void {
        const stepIndex = Model.stepIdList.getStepIndex(stepId);
        Model.curStepIndex = stepIndex;
    }

    public static getFirstStepId(submodule_id: string): string {

        for (let i=0; i < Model.program.modules.length; i++) {
//        console.log("ID: " + model.content.program.modules[i].id)
            for (let j=0; j < Model.program.modules[i].submodules.length; j++) {
                const cur_submodule_id = Model.program.modules[i].submodules[j].id;
//            console.log("ID-SM: " + cur_submodule_id);
                if (cur_submodule_id == submodule_id) {
                    const step0_id = Model.program.modules[i].submodules[j].steps[0].id;
                    if (step0_id == null) {
                        Logger("Konnte keinen ersten Step im Submodul mit ID " + submodule_id + " finden.");
                        return "unknown_id";
                    }
//                console.log("####> " + step0_id);
                    return step0_id;
                }

            }
        }

        Logger("Konnte im Programm kein Submodul mit ID " + submodule_id + " finden.");
        return "unknown_id";
    }

}