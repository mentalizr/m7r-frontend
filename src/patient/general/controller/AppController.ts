import {StepModel} from "../../content/mainContent/model/StepModel";
import {TherapeutController} from "./TherapeutController";
import {PatientController} from "./PatientController";
import {MenuController} from "./MenuController";
import {MainContentController} from "../../content/mainContent/MainContentController";
import {ButtonBarController} from "../../content/buttonBar/controller/ButtonBarController";
import {BreadcrumbController} from "./BreadcrumbController";
import {InfolinkController} from "../../content/mainContent/InfolinkController";
import {LogoutController} from "../logout/LogoutController";
import {StartpageController} from "./StartpageController";
import {BackdropSpinnerController} from "./BackdropSpinnerController";
import {GeneralAlertController} from "../../content/generalAlert/GeneralAlertController";
import {TimeoutController} from "./TimeoutController";
import {SplashController} from "./SplashController";
import {MCInitializer} from "m7r-web-components";
import {PatientFetch} from "../fetch/PatientFetch";
import {TherapistFetch} from "../fetch/TherapistFetch";
import {ProgramFetch} from "../fetch/ProgramFetch";
import {ProgramContentFetch} from "../fetch/ProgramContentFetch";
import {FormDataFetchPageScope} from "../../content/mainContent/formDataPersist/rest/load/FormDataFetchPageScope";
import {Logger} from "../../../helper/Logger";
import {FeedbackDataFetch} from "../../content/mainContent/formDataPersist/rest/load/FeedbackDataFetch";
import {FeedbackData} from "../../content/mainContent/model/formData/FeedbackData";
import {FetchResponseError} from "../../content/mainContent/formDataPersist/rest/FetchResponseError";
import {FormDataFetchProgramNamedScope} from "../../content/mainContent/formDataPersist/rest/load/FormDataFetchProgramNamedScope";
import {FormDataFetchProgramGenericScope} from "../../content/mainContent/formDataPersist/rest/load/FormDataFetchProgramGenericScope";
import {ButtonBarControllerEvents} from "../../content/buttonBar/controller/ButtonBarControllerEvents";
import {ScrollUpController} from "./ScrollUpController";
import {MediaElementCleaner} from "../../content/mainContent/MediaElementCleaner";
import {AppConfigFetch} from "../fetch/AppConfigFetch";
import {AppConfig} from "../../appFrame/model/AppConfig";
import {Model} from "../model/Model";
import {HtmlChunkLoginFetch} from "../fetch/HtmlChunkLoginFetch";
import {SessionStatusFetch} from "../../../application/SessionStatusFetch";
import {AbstractAppController} from "../../../application/AbstractAppController";

export class AppController {

    private static getStepContentPromise() {
        return ProgramContentFetch.execute()
            .then(function() {
                return Promise.all(
                    [FormDataFetchPageScope.execute(),
                        FormDataFetchProgramGenericScope.execute(),
                        FormDataFetchProgramNamedScope.execute(),
                        FeedbackDataFetch.execute()]);
            })
            .then(function() {
                const feedbackData: FeedbackData = FeedbackDataFetch.getFeedbackData();
                StepModel.setFeedbackData(feedbackData);
                // StepModel.getFormDataModel().debugOut();
            });
    }

    public static initApp(): void {

        SplashController.show();

        AppController.initAppPatient()
            .then(() => {
                SplashController.hide();
            })

    }

    public static initAppPatient() {

        // let htmlChunkUserFetch = HtmlChunkUserFetch.execute();
        let appConfigFetch = AppConfigFetch.execute();
        let patientFetch = PatientFetch.execute();
        let therapistFetch = TherapistFetch.execute();
        let stepContentPromise = ProgramFetch.execute()
            .then(function() {
                return AppController.getStepContentPromise();
            })

        return Promise.all([appConfigFetch, patientFetch, therapistFetch, stepContentPromise])
            .then(function () {

                // console.log("Initialisierung des Modells abgeschlossen.");

                AppController.initView();
                MenuController.initView();
                TherapeutController.initView();
                PatientController.updateView();

                // MainContentController.updateView();
                ButtonBarController.updateView();
                BreadcrumbController.updateView();

                StartpageController.registerClick();
                ScrollUpController.register();
                TimeoutController.registerClick();
                LogoutController.registerClickLogout();
                ButtonBarControllerEvents.registerUserEvents();
                // InfolinkController.registerClickEvent();
                MenuController.registerUserEvents();

                SplashController.hide();

                MainContentController.updateView();
                InfolinkController.registerClickEvent();


                // MCInitializer.initializeQuestions();
                console.log("Calling MCInitializer.initializeQuestions() ...");
                MCInitializer.initializeQuestions();

            });

    }

    public static stepUpdate(): void {

        BackdropSpinnerController.show();

        MediaElementCleaner.clean();

        AppController.getStepContentPromise()
            .catch(function(error) {
                AppController.handleError(error);
            })
            .then(function() {
                // console.log("Initialisierung ProgramContent abgeschossen.");

                BackdropSpinnerController.hide();

                // MenuController.initView();
                MainContentController.updateView();
                ButtonBarController.updateView();
                BreadcrumbController.updateView();
                InfolinkController.registerClickEvent();

                MCInitializer.initializeQuestions();
            })
    }

    private static initView(): void {

        const appConfig: AppConfig = Model.appConfig;
        document.title = appConfig.name;

    }

    private static handleError(error: Error): void {

        if (error instanceof FetchResponseError) {
            Logger(error.message);

            if (error.getStatus() === 401) {
                TimeoutController.showTimoutModal();
            } else {
                GeneralAlertController.showWithText("Es ist ein Fehler aufgetreten. Bitte prüfen Sie die Internetverbindung und versuchen Sie es erneut.");
            }
        } else {
            Logger("[AppController.initApp] Error: " + error.message);
            console.trace();
        }
    }

}