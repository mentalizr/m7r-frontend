import {AbstractAppController} from "../../../application/AbstractAppController";
import {ErrorHandler} from "./ErrorHandler";
import {ProgramContentFetch} from "../fetch/ProgramContentFetch";
import {FormDataFetchPageScope} from "../../content/mainContent/formDataPersist/rest/load/FormDataFetchPageScope";
import {FormDataFetchProgramGenericScope} from "../../content/mainContent/formDataPersist/rest/load/FormDataFetchProgramGenericScope";
import {FormDataFetchProgramNamedScope} from "../../content/mainContent/formDataPersist/rest/load/FormDataFetchProgramNamedScope";
import {SplashController} from "../../../general/controller/SplashController";
import {AppConfigPatientFetch} from "../fetch/AppConfigPatientFetch";
import {UserFetch} from "../fetch/UserFetch";
import {TherapistFetch} from "../fetch/TherapistFetch";
import {ProgramFetch} from "../fetch/ProgramFetch";
import {MenuController} from "./MenuController";
import {TherapistController} from "./TherapistController";
import {UserController} from "./UserController";
import {ButtonBarController} from "../../content/buttonBar/controller/ButtonBarController";
import {BreadcrumbController} from "./BreadcrumbController";
import {StartpageController} from "./StartpageController";
import {ScrollUpController} from "../../../general/controller/ScrollUpController";
import {TimeoutController} from "./TimeoutController";
import {LogoutController} from "../../../general/logout/LogoutController";
import {ButtonBarControllerEvents} from "../../content/buttonBar/controller/ButtonBarControllerEvents";
import {MainContentController} from "../../content/mainContent/MainContentController";
import {InfolinkController} from "../../content/mainContent/InfolinkController";
import {MCInitializer} from "../../../../../m7r-web-components";
import {BackdropSpinnerController} from "./BackdropSpinnerController";
import {MediaElementCleaner} from "../../content/mainContent/MediaElementCleaner";
import {AppConfigPatient} from "../../appFrame/model/AppConfigPatient";
import {Model} from "../model/Model";
import {FormDataFetchPageScopePreviousPage} from "../../content/mainContent/formDataPersist/rest/load/FormDataFetchPageScopePreviousPage";
import {RefreshController} from "./RefreshController";

export class PatientAppController extends AbstractAppController {

    initialize(htmlChunk: string): Promise<any> {

        this.mountHtmlChunk(htmlChunk);

        SplashController.show();

        PatientAppController.initAppPatient()
            .then(() => {
                SplashController.hide();
            })

        return Promise.resolve(undefined);
    }

    private static initAppPatient() {

        let appConfigFetch = AppConfigPatientFetch.execute();
        let userFetch = UserFetch.execute();
        let therapistFetch = TherapistFetch.execute();
        let stepContentPromise = ProgramFetch.execute()
            .then(function() {
                return PatientAppController.getStepContentPromise();
            })

        return Promise.all([appConfigFetch, userFetch, therapistFetch, stepContentPromise])
            .then(function () {

                PatientAppController.initView();
                MenuController.initView();
                TherapistController.initView();
                UserController.updateView();
                ButtonBarController.updateView();
                BreadcrumbController.updateView();
                RefreshController.updateView();

                StartpageController.registerClick();
                ScrollUpController.register();
                TimeoutController.registerClick();
                LogoutController.registerClickLogout();
                ButtonBarControllerEvents.registerUserEvents();
                MenuController.registerUserEvents();
                RefreshController.registerUserEvents();

                SplashController.hide();

                MainContentController.updateView();
                InfolinkController.registerClickEvent();

                MCInitializer.initializeQuestions();
            });

    }

    public static stepUpdate(): void {

        BackdropSpinnerController.show();

        MediaElementCleaner.clean();

        PatientAppController.getStepContentPromise()
            .catch(function(error) {
                ErrorHandler.handleError(error);
            })
            .then(function() {
                // console.log("Initialisierung ProgramContent abgeschossen.");

                BackdropSpinnerController.hide();

                MainContentController.updateView();
                ButtonBarController.updateView();
                BreadcrumbController.updateView();
                RefreshController.updateView();
                InfolinkController.registerClickEvent();

                MCInitializer.initializeQuestions();
            })
    }

    public static refreshFeedbackPage(): Promise<unknown> {
        BackdropSpinnerController.show();

        return FormDataFetchPageScopePreviousPage.execute()
            .then(RefreshController.interimProgramUpdate)
            .then(() => {
                BackdropSpinnerController.hide();

                MainContentController.updateView();
                ButtonBarController.updateView();
                // MenuController.renderMenu();
                // BreadcrumbController.updateView();
                RefreshController.updateView();
                // InfolinkController.registerClickEvent();
                // MCInitializer.initializeQuestions();
            });
    }

    private static initView(): void {

        const appConfig: AppConfigPatient = Model.appConfigPatient;
        document.title = appConfig.name;

    }

    private static getStepContentPromise() {
        return ProgramContentFetch.execute()
            .then(function() {
                return Promise.all(
                    [FormDataFetchPageScope.execute(),
                        FormDataFetchProgramGenericScope.execute(),
                        FormDataFetchProgramNamedScope.execute(),
                        FormDataFetchPageScopePreviousPage.execute()]);
            })
            .then(function() {
                // Debug
                // console.log("getStepContentPromise.then ...");
                //
                // console.log("isCurrentStepFeedback? " + Model.getProgramModel().isCurrentStepFeedback());
                // console.log("hasAccessibleNextStep? " + Model.getProgramModel().hasAccessibleNextStep());
                // if (Model.getProgramModel().isCurrentStepFeedback())
                //     console.log("hasFeedback? " + Model.getStepModel().getFormDataModel().hasFeedback());

                return RefreshController.interimProgramUpdate();

                // if (Model.getProgramModel().isCurrentStepFeedback()
                // && !Model.getProgramModel().hasAccessibleNextStep()
                // && Model.getStepModel().getFormDataModel().hasFeedback()) {
                //     console.log("getStepContentPromise.then ... perform programFetch");
                //     const stepId: string = Model.getProgramModel().getCurrentStepId();
                //     return ProgramFetch.execute().then(() => {
                //         Model.getProgramModel().initializeForStepId(stepId);
                //     });
                // }

                // console.log("getStepContentPromise.then finished.");
            });
    }

}
