import {Model} from "../model/Model";
import {ProgramFetch} from "../fetch/ProgramFetch";
import {PatientAppController} from "./PatientAppController";
import {MenuController} from "./MenuController";

const ID_REFRESH_LINK = "navbar-refresh--link";

export class RefreshController {

    public static updateView(): void {
        if (this.isFeedbackPageInPendingState()) {
            this.show();
        } else {
            this.hide();
        }
    }

    public static registerUserEvents() {
        document.getElementById(ID_REFRESH_LINK).addEventListener("click", function () {
            PatientAppController.refreshFeedbackPage()
                // .then(r => console.log("Refresh feedback status after refresh button pressed."));
        })
    }

    private static hide(): void {
        document.getElementById(ID_REFRESH_LINK).classList.add("d-none");
    }

    private static show(): void {
        document.getElementById(ID_REFRESH_LINK).classList.remove("d-none");
    }

    public static interimProgramUpdate(): Promise<unknown> {
        if (RefreshController.hasFeedbackForPendingFeedbackPage()) {
            // console.log("getStepContentPromise.then ... perform programFetch");
            const stepId: string = Model.getProgramModel().getCurrentStepId();
            return ProgramFetch.execute().then(() => {
                Model.getProgramModel().initializeForStepId(stepId);
                MenuController.renderMenu();
                MenuController.registerMenuClicks();
            });
        }
    }

    private static isFeedbackPageInPendingState(): boolean {
        return Model.getProgramModel().isCurrentStepFeedback()
            && !Model.getProgramModel().hasAccessibleNextStep();
    }

    private static hasFeedbackForPendingFeedbackPage(): boolean {
        return this.isFeedbackPageInPendingState()
            && Model.getStepModel().getFormDataModel().hasFeedback();
    }

}