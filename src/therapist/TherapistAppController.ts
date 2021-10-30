import {AbstractAppController} from "../application/AbstractAppController";
import {SplashController} from "../general/controller/SplashController";
import {LogoutController} from "../general/logout/LogoutController";
import {UserFetch} from "../patient/general/fetch/UserFetch";
import {UserController} from "../patient/general/controller/UserController";
import {AppConfigTherapistServide} from "./general/rest/AppConfigTherapistServide";
import {ModelTherapist} from "./general/model/ModelTherapist";
import {AppConfigTherapist} from "./general/entities/AppConfigTherapist";
import {MenuTherapistController} from "./general/controller/MenuTherapistController";
import {PatientsOverviewService} from "./general/rest/PatientsOverviewService";
import {PatientsOverviewController} from "./general/controller/PatientsOverviewController";
import {AppStateTherapist} from "./general/model/AppStateTherapist";
import {NavbarTherapistController} from "./general/controller/NavbarTherapistController";
import {PatientMessagesController} from "./general/controller/PatientMessagesController";
import {ScrollUpController} from "../general/controller/ScrollUpController";

const ID_MAIN_CONTENT = "main-content";
const ID_MESSAGE_CONTENT = "message-content";

export class TherapistAppController extends AbstractAppController {

    initialize(htmlChunk: string): Promise<any> {

        this.mountHtmlChunk(htmlChunk);

        SplashController.show();

        TherapistAppController.initAppTherapist()
            .then(() => {
                SplashController.hide();
            })

        return Promise.resolve(undefined);
    }

    private static initAppTherapist() {

        let appConfigFetch = AppConfigTherapistServide.execute();
        let userFetch = UserFetch.execute();
        let patientsOverviewFetch = PatientsOverviewService.execute();

        return Promise.all([userFetch, appConfigFetch, patientsOverviewFetch])
            .then(function () {
                TherapistAppController.globalInit();
                TherapistAppController.contentInit();
            });
    }

    public static refreshAppTherapist(backToOverview: boolean): Promise<unknown> {
        if (AppStateTherapist.isStateOverview() || backToOverview) {
            let patientsOverviewFetch = PatientsOverviewService.execute();

            return Promise.all([patientsOverviewFetch])
                .then(function () {
                    TherapistAppController.contentInit();
                });
        } else if (AppStateTherapist.isStateMessages()) {
            const patientId = AppStateTherapist.getStateMessages().userIdPatient;
            return PatientMessagesController.initialize(patientId);
        } else {
            throw new Error("Unknown state of therapist app.");
        }
    }

    private static globalInit() {
        TherapistAppController.initView();
        MenuTherapistController.initView();
        UserController.updateView();
        LogoutController.registerClickLogout();
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