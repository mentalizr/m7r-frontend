import {AbstractAppController} from "../application/AbstractAppController";
import {ErrorHandler} from "../patient/general/controller/ErrorHandler";

export class TherapistAppController extends AbstractAppController {

    initialize(htmlChunk: string): Promise<any> {

        this.mountHtmlChunk(htmlChunk);

        // AppController.initApp();
        console.log("Controller for therapist is going to be initialized here.");

        return Promise.resolve(undefined);
    }

}