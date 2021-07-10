import {AbstractAppController} from "../application/AbstractAppController";
import {ErrorHandler} from "../patient/general/controller/ErrorHandler";
import {SplashController} from "../patient/general/controller/SplashController";
import {LogoutController} from "../general/logout/LogoutController";

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
        console.log("Controller for therapist is going to be initialized here.");
        return Promise.all([])
            .then(function () {
                LogoutController.registerClickLogout();
            });
    }

}