import {Model} from "../model/Model";

const ID_STATUS_LABEL = "status_label";

export class BreadcrumbController {

    public static updateView(): void {
        let breadcrumbString = this.getBreadcrumbString();
        document.getElementById(ID_STATUS_LABEL).textContent = breadcrumbString;
    }

    private static getBreadcrumbString(): string {

        return Model.infotextStatus.isInfotextDisplayed() ? BreadcrumbController.getBreadcrumbStringForCurrentInfotext() : BreadcrumbController.getBreadcrumbStringForCurStep();

        // if (Model.isInfotextShown()) {
        //     return BreadcrumbController.getBreadcrumbStringForCurrentInfotext();
        // }
        // return BreadcrumbController.getBreadcrumbStringForCurStep();

    }

    public static getBreadcrumbStringForCurrentInfotext(): string {
        return "Infotext: " + Model.infotextStatus.getCurrentInfotextName();
    }

    private static getBreadcrumbStringForCurStep(): string {

        const stepId = Model.programStepper.getCurrentStepId();
        const modules = Model.programStepper.getProgram().modules;
        let breadcrumb = "";

        for (let i=0; i < modules.length; i++) {
            if (stepId.startsWith(modules[i].id)) {
                breadcrumb = modules[i].name;
                for (let j=0; j < modules[i].submodules.length; j++) {
                    if (stepId.startsWith(modules[i].submodules[j].id)) {
                        breadcrumb += " > " + modules[i].submodules[j].name;
                        for (let k=0; k < modules[i].submodules[j].steps.length; k++) {
                            if (stepId == modules[i].submodules[j].steps[k].id) {
                                breadcrumb += " > " + modules[i].submodules[j].steps[k].name;
                                return breadcrumb;
                            }
                        }
                    }
                }
            }
        }

        return "";
    }

}