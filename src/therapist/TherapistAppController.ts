import {AbstractAppController} from "../application/AbstractAppController";
import {ErrorHandler} from "../patient/general/controller/ErrorHandler";
import {SplashController} from "../patient/general/controller/SplashController";
import {LogoutController} from "../general/logout/LogoutController";
import {UserFetch} from "../patient/general/fetch/UserFetch";
import {UserController} from "../patient/general/controller/UserController";

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
        console.log("Controller for therapist is going to be initialized here ...");

        let userFetch = UserFetch.execute();

        return Promise.all([userFetch])
            .then(function () {
                UserController.updateView();
                LogoutController.registerClickLogout();
            });
    }

}