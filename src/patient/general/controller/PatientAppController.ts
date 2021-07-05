import {AbstractAppController} from "../../../application/AbstractAppController";
import {AppController} from "./AppController";

export class PatientAppController extends AbstractAppController {

    initialize(htmlChunk: string): Promise<any> {

        this.mountHtmlChunk(htmlChunk);

        AppController.initApp();

        return Promise.resolve(undefined);
    }

}