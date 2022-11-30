import {SessionStatusFetch} from "./SessionStatusFetch";
import {SessionStatus} from "../patient/general/entities/SessionStatus";
import {AbstractAppChunkFetch} from "./AbstractAppChunkFetch";
import {AppChunkFetchPatient} from "./AppChunkFetchPatient";
import {AbstractAppController} from "./AbstractAppController";
import {PatientAppController} from "../patient/general/controller/PatientAppController";
import {Logger} from "../helper/Logger";
import {EntrypointOption} from "../routing/EntryPointOptions/EntrypointOption";
import {AppChunkFetchTherapist} from "./AppChunkFetchTherapist";
import {TherapistAppController} from "../therapist/TherapistAppController";
import {ErrorHandler} from "../general/error/ErrorHandler";
import {AppChunkFetchPolicy} from "./AppChunkFetchPolicy";
import {PolicyController} from "../policy/PolicyController";

export class AppInitializer {

    private static abstractAppChunkFetch: AbstractAppChunkFetch = undefined;
    private static abstractAppController: AbstractAppController = undefined;

    public static start(): void {

        AppInitializer.execute()
            .then(function () {
                console.log("Application is initialized! Hoho!");
            })
            // .catch(function(error) {
            //     // TODO debug
            //     console.log("Error catched: " + error);
            //     ErrorHandler.handleError(error);
            // });

    }

    public static execute(): Promise<void> {

        return SessionStatusFetch.execute()
            .then(AppInitializer.build)
            .then(AppInitializer.fetchChunk)
            .then(AppInitializer.initialize);

    }

    private static build() {

        const sessionStatus: SessionStatus = SessionStatusFetch.getSessionStatus();

        if (sessionStatus.isIntermediate()) {

            Logger("Session is intermediate.")

            if (sessionStatus.isPolicyConsentRequired()) {
                Logger("Policy consent required.");
                AppInitializer.abstractAppChunkFetch = new AppChunkFetchPolicy();
                AppInitializer.abstractAppController = new PolicyController();
            }

        } else if (!sessionStatus.isValid()) {

            Logger("Session is not valid")

            const entryPointOption: EntrypointOption = new EntrypointOption();

            AppInitializer.abstractAppChunkFetch = entryPointOption.abstractAppChunkFetch;
            AppInitializer.abstractAppController = entryPointOption.abstractAppController;

        } else if (sessionStatus.isUserInRolePatient()) {
            AppInitializer.abstractAppChunkFetch = new AppChunkFetchPatient();
            AppInitializer.abstractAppController = new PatientAppController();

        } else if (sessionStatus.isUserInRoleTherapist()) {
            AppInitializer.abstractAppChunkFetch = new AppChunkFetchTherapist();
            AppInitializer.abstractAppController = new TherapistAppController();

        } else {

            Logger("Unrecognized user role: [" + sessionStatus.getUserRole() + "].");
        }

        // TODO Add further roles here
    }

    private static fetchChunk() {
        return AppInitializer.abstractAppChunkFetch.execute();
    }

    private static initialize() {
        return AppInitializer.abstractAppController.initialize(AppInitializer.abstractAppChunkFetch.getChunk());
    }

}