import {AbstractAppController} from "../../../application/AbstractAppController";
import {ErrorHandler} from "./ErrorHandler";
import {ProgramContentFetch} from "../fetch/ProgramContentFetch";
import {FormDataFetchPageScope} from "../../content/mainContent/formDataPersist/rest/load/FormDataFetchPageScope";
import {FormDataFetchProgramGenericScope} from "../../content/mainContent/formDataPersist/rest/load/FormDataFetchProgramGenericScope";
import {FormDataFetchProgramNamedScope} from "../../content/mainContent/formDataPersist/rest/load/FormDataFetchProgramNamedScope";
import {FeedbackDataFetch} from "../../content/mainContent/formDataPersist/rest/load/FeedbackDataFetch";
import {FeedbackData} from "../../content/mainContent/model/formData/FeedbackData";
import {StepModel} from "../../content/mainContent/model/StepModel";
import {SplashController} from "./SplashController";
import {AppConfigFetch} from "../fetch/AppConfigFetch";
import {UserFetch} from "../fetch/UserFetch";
import {TherapistFetch} from "../fetch/TherapistFetch";
import {ProgramFetch} from "../fetch/ProgramFetch";
import {MenuController} from "./MenuController";
import {TherapistController} from "./TherapistController";
import {UserController} from "./UserController";
import {ButtonBarController} from "../../content/buttonBar/controller/ButtonBarController";
import {BreadcrumbController} from "./BreadcrumbController";
import {StartpageController} from "./StartpageController";
import {ScrollUpController} from "./ScrollUpController";
import {TimeoutController} from "./TimeoutController";
import {LogoutController} from "../../../general/logout/LogoutController";
import {ButtonBarControllerEvents} from "../../content/buttonBar/controller/ButtonBarControllerEvents";
import {MainContentController} from "../../content/mainContent/MainContentController";
import {InfolinkController} from "../../content/mainContent/InfolinkController";
import {MCInitializer} from "../../../../../m7r-web-components";
import {BackdropSpinnerController} from "./BackdropSpinnerController";
import {MediaElementCleaner} from "../../content/mainContent/MediaElementCleaner";
import {AppConfig} from "../../appFrame/model/AppConfig";
import {Model} from "../model/Model";

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

        // let htmlChunkUserFetch = HtmlChunkUserFetch.execute();
        let appConfigFetch = AppConfigFetch.execute();
        let userFetch = UserFetch.execute();
        let therapistFetch = TherapistFetch.execute();
        let stepContentPromise = ProgramFetch.execute()
            .then(function() {
                return PatientAppController.getStepContentPromise();
            })

        return Promise.all([appConfigFetch, userFetch, therapistFetch, stepContentPromise])
            .then(function () {

                // console.log("Initialisierung des Modells abgeschlossen.");

                PatientAppController.initView();
                MenuController.initView();
                TherapistController.initView();
                UserController.updateView();

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

        PatientAppController.getStepContentPromise()
            .catch(function(error) {
                ErrorHandler.handleError(error);
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



}