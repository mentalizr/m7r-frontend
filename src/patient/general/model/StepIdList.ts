import {Program} from "../entities/Program";
import {Logger} from "../../../helper/Logger";

export class StepIdList {

    private stepIdList: Array<string>;

    constructor(program: Program) {

        this.stepIdList = new Array<string>();

        for (let i=0; i < program.modules.length; i++) {
            //        console.log("Model-ID: " + model.content.program.modules[i].id)
            for (let j=0; j < program.modules[i].submodules.length; j++) {
                const cur_submodule_id = program.modules[i].submodules[j].id;
                //            console.log("Submodule-ID: " + cur_submodule_id);
                for (let k=0; k < program.modules[i].submodules[j].steps.length; k++) {
                    const curStepId = program.modules[i].submodules[j].steps[k].id;
                    //                console.log("Step-ID: " + curStepId);
                    this.stepIdList.push(curStepId);
                }
            }
        }

        // console.log(this.stepIdList.length + " Elemente in der StepIdList initialisiert.");
    }

    public getFirstStepId(): String {

        if (this.stepIdList.length > 0) return this.stepIdList[0];
        throw new Error("StepIdList enthält keine Elemente.");
    }

    public getNrOfSteps(): number {
        return this.stepIdList.length;
    }

    public getStepId(index: number): string {
        return this.stepIdList[index];
    }

    public getStepIndex(stepId: string): number {
        for (let i=0; i < this.stepIdList.length; i++) {
            if (this.stepIdList[i] == stepId) return i;
        }
        Logger("Keinen stepIndex gefunden für stepId " + stepId);
        return 0;
    }

    public debugOut(): void {
        console.log("STEP-ID-LIST:");
        this.stepIdList.forEach(function(id){
            console.log(id);
        })
    }

}