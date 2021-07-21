import {AbstractAppController} from "../application/AbstractAppController";
import {SplashController} from "../patient/general/controller/SplashController";
import {LogoutController} from "../general/logout/LogoutController";
import {UserFetch} from "../patient/general/fetch/UserFetch";
import {UserController} from "../patient/general/controller/UserController";
import {AppConfigTherapistFetch} from "./general/fetch/AppConfigTherapistFetch";
import {ModelTherapist} from "./general/model/ModelTherapist";
import {AppConfigTherapist} from "./general/entities/AppConfigTherapist";
import {MenuTherapistController} from "./general/controller/MenuTherapistController";
import {PatientsOverviewFetch} from "./general/fetch/PatientsOverviewFetch";
import {PatientAppController} from "../patient/general/controller/PatientAppController";
import {PatientsOverviewController} from "./general/controller/PatientsOverviewController";

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

        let appConfigFetch = AppConfigTherapistFetch.execute();
        let userFetch = UserFetch.execute();
        let patientsOverviewFetch = PatientsOverviewFetch.execute();

        return Promise.all([userFetch, appConfigFetch, patientsOverviewFetch])
            .then(function () {
                ModelTherapist.initialize();
                TherapistAppController.initView();
                MenuTherapistController.initView();
                UserController.updateView();
                LogoutController.registerClickLogout();
                MenuTherapistController.registerUserEvents();
                PatientsOverviewController.initView();
                PatientsOverviewController.registerEvents();
            });
    }

    private static initView(): void {
        const appConfig: AppConfigTherapist = ModelTherapist.appConfigTherapist;
        document.title = appConfig.name;
    }

}