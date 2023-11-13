import {AbstractAppController} from "../../../application/AbstractAppController";
import {ErrorHandler} from "../../../general/error/ErrorHandler";
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
import {ButtonBarControllerEvents} from "../../content/buttonBar/controller/ButtonBarControllerEvents";
import {MainContentController} from "../../content/mainContent/MainContentController";
import {InfolinkController} from "../../content/mainContent/InfolinkController";
import {MCInitializer} from "../../../../../m7r-web-components";
import {MultiAudioInitializer} from "../../../../../m7r-web-components/js-out/multiAudio/MultiAudioInitializer";
import {BackdropSpinnerController} from "./BackdropSpinnerController";
import {MediaElementCleaner} from "../../content/mainContent/MediaElementCleaner";
import {AppConfigPatient} from "../../appFrame/model/AppConfigPatient";
import {Model} from "../model/Model";
import {FormDataFetchPageScopePreviousPage} from "../../content/mainContent/formDataPersist/rest/load/FormDataFetchPageScopePreviousPage";
import {RefreshController} from "./RefreshController";
import {PatientStatusFetch} from "../fetch/PatientStatusFetch";
import {ErrorController} from "./ErrorController";
import {ModalSendConfirm} from "../component/ModalSendConfirm";
import {ModalLogout} from "../../../general/logout/ModalLogout";
import {ModalTimeout} from "../../../general/timeout/ModalTimeout";
import {ModalError} from "../../../general/error/ModalError";
import {ModalNIY} from "../../../general/niy/ModalNIY";

export class PatientAppController extends AbstractAppController {

    initialize(htmlChunk: string): Promise<any> {

        // TODO test
        // console.log("Paragraph as string:");
        // console.log(HtmlTest.getParagraphAsString());
        // HtmlTest.logParagraph();
        // console.log(para);

        // const modalConfig: ModalConfig = new ModalConfig();
        // modalConfig.id = "test";
        // modalConfig.header = "headerText";
        // modalConfig.text = "modalText";
        // modalConfig.buttonConfirmId = "confirmId";
        // modalConfig.buttonConfirmLabel = "confirmLabel";
        // modalConfig.buttonCancelLabel = "cancelLabel";
        // console.log(ModalAlert.html(modalConfig));

        // const test: string = Mustache.render("text: {{text}}", {text: "hallöschen<br/>"});
        // console.log(test);

        this.mountHtmlChunk(htmlChunk);
        SplashController.show();
        ModalLogout.create();
        ModalLogout.registerConfirmedButton();
        ModalTimeout.create();
        ModalTimeout.registerConfirmedButton();
        ModalSendConfirm.create();
        ModalError.create();
        ModalError.registerConfirmedButton();
        ModalNIY.create();
        ModalNIY.registerConfirmedButton();

        return PatientAppController.initAppPatient()
            .then(() => {
                SplashController.hide();
            })

        // return Promise.resolve(undefined);
    }

    private static initAppPatient() {
        // ErrorController.registerClick();

        let appConfigFetch = AppConfigPatientFetch.execute();
        let userFetch = UserFetch.execute();
        let therapistFetch = TherapistFetch.execute();
        let patientStatus = PatientStatusFetch.execute();

        return Promise.all([appConfigFetch, userFetch, therapistFetch, patientStatus])
            .then(function () {
                return ProgramFetch.execute()
                    .then(function () {
                        return PatientAppController.getStepContentPromise();
                    })
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
                        // TimeoutController.registerClick();
                        // LogoutController.registerClickLogout();
                        ButtonBarControllerEvents.registerUserEvents();
                        MenuController.registerUserEvents();
                        RefreshController.registerUserEvents();

                        SplashController.hide();

                        MainContentController.updateView();
                        InfolinkController.registerClickEvent();

                        MCInitializer.initializeQuestions();
                        MultiAudioInitializer.initialize();
                    });
            });
    }

    public static stepUpdate(): void {

        BackdropSpinnerController.show();

        MediaElementCleaner.clean();

        PatientAppController.getStepContentPromise()
            .then(function() {
                BackdropSpinnerController.hide();

                MainContentController.updateView();
                ButtonBarController.updateView();
                BreadcrumbController.updateView();
                RefreshController.updateView();
                InfolinkController.registerClickEvent();

                MCInitializer.initializeQuestions();
            });

    }

    public static refreshFeedbackPage(): Promise<unknown> {
        BackdropSpinnerController.show();

        return FormDataFetchPageScopePreviousPage.execute()
            .then(RefreshController.interimProgramUpdate)
            .then(() => {
                BackdropSpinnerController.hide();

                MainContentController.updateView();
                ButtonBarController.updateView();
                RefreshController.updateView();
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
                return RefreshController.interimProgramUpdate();
            });
    }

}
