import {AbstractAppController} from "../application/AbstractAppController";
import {SplashController} from "../general/controller/SplashController";
import {UserFetch} from "../patient/general/fetch/UserFetch";
import {UserController} from "../patient/general/controller/UserController";
import {AppConfigTherapistService} from "./general/rest/AppConfigTherapistService";
import {ModelTherapist} from "./general/model/ModelTherapist";
import {AppConfigTherapist} from "./general/entities/AppConfigTherapist";
import {MenuTherapistController} from "./general/controller/MenuTherapistController";
import {PatientsOverviewService} from "./general/rest/PatientsOverviewService";
import {PatientsOverviewController} from "./general/controller/pages/PatientsOverviewController";
import {AppStateTherapist} from "./general/model/AppStateTherapist";
import {NavbarTherapistController} from "./general/controller/NavbarTherapistController";
import {PatientMessagesController} from "./general/controller/pages/PatientMessagesController";
import {ScrollUpController} from "../general/controller/ScrollUpController";
import {ModalLogout} from "../general/logout/ModalLogout";
import {ModalTimeout} from "../general/timeout/ModalTimeout";
import {ModalError} from "../general/error/ModalError";

const ID_MAIN_CONTENT = "main-content";
const ID_MESSAGE_CONTENT = "message-content";

export class TherapistAppController extends AbstractAppController {

    initialize(htmlChunk: string): Promise<any> {

        this.mountHtmlChunk(htmlChunk);
        SplashController.show();
        ModalLogout.create();
        ModalLogout.registerConfirmedButton();
        ModalTimeout.create();
        ModalTimeout.registerConfirmedButton();
        ModalError.create();
        ModalError.registerConfirmedButton();

        TherapistAppController.initAppTherapist()
            .then(() => {
                SplashController.hide();
            })

        return Promise.resolve(undefined);
    }

    private static initAppTherapist() {

        let appConfigFetch = AppConfigTherapistService.execute();
        let userFetch = UserFetch.execute();
        let patientsOverviewFetch = PatientsOverviewService.execute();

        return Promise.all([userFetch, appConfigFetch, patientsOverviewFetch])
            .then(function () {
                TherapistAppController.globalInit();
                TherapistAppController.contentInit();
            });
    }

    public static refreshAppTherapist(): Promise<unknown> {
        if (AppStateTherapist.isStateOverview()) {
            let patientsOverviewFetch = PatientsOverviewService.execute();
            return Promise.all([patientsOverviewFetch])
                .then(function () {
                    TherapistAppController.contentInit();
                });
        } else if (AppStateTherapist.isStateMessages()) {
            const patientId = AppStateTherapist.getStateMessages().userIdPatient;
            return PatientMessagesController.initialize(patientId);
        } else if (AppStateTherapist.isStateViewExercise()) {
            throw new Error("No refresh button in state VIEW_EXERCISE.");
        } else {
            throw new Error("Unknown state of therapist app.");
        }
    }

    public static goBack(): Promise<unknown> {
        if (AppStateTherapist.isStateMessages()) {
            let patientsOverviewFetch = PatientsOverviewService.execute();
            return Promise.all([patientsOverviewFetch])
                .then(function () {
                    TherapistAppController.contentInit();
                });
        } else if (AppStateTherapist.isStateViewExercise()) {
            const patientId = AppStateTherapist.getStateViewExercise().userIdPatient;
            return PatientMessagesController.initialize(patientId);
        } else if (AppStateTherapist.isStateOverview()) {
            throw new Error("No back button in state OVERVIEW.");
        } else {
            throw new Error("Unknown state of therapist app.");
        }
    }

    private static globalInit() {
        TherapistAppController.initView();
        MenuTherapistController.initView();
        UserController.updateView();
        // LogoutController.registerClickLogout();
        MenuTherapistController.registerUserEvents();
        ScrollUpController.register();
        NavbarTherapistController.registerUserEvents();
    }

    private static contentInit() {
        AppStateTherapist.initialize();
        PatientsOverviewController.initView();
        PatientsOverviewController.registerEvents();
    }

    private static initView(): void {
        const appConfig: AppConfigTherapist = ModelTherapist.appConfigTherapist;
        document.title = appConfig.name;
    }

    public static cleanView(): void {
        document.getElementById(ID_MAIN_CONTENT).innerHTML = "";
        document.getElementById(ID_MESSAGE_CONTENT).innerHTML = "";
    }

}