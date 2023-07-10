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
import {AppChunkFetchPolicyConsent} from "./AppChunkFetchPolicyConsent";
import {PolicyConsentController} from "../policyConsent/PolicyConsentController";
import {Dispatcher} from "../routing/Dispatcher";

export class AppInitializer {

    private static abstractAppChunkFetch: AbstractAppChunkFetch = undefined;
    private static abstractAppController: AbstractAppController = undefined;

    public static start(): void {

        AppInitializer.execute()
            .then(function () {
                // console.log("Application is initialized!");
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

            if (sessionStatus.isPolicyConsentRequired()) {
                Logger("Policy consent required.");
                AppInitializer.abstractAppChunkFetch = new AppChunkFetchPolicyConsent();
                AppInitializer.abstractAppController = new PolicyConsentController();
            } else if (sessionStatus.isEmailConfirmationRequired()) {
                Logger("ERROR. Email confirmation required. Not yet supported by frontend.");
            }

        } else if (!sessionStatus.isValid()) {

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
    }

    private static fetchChunk() {
        return AppInitializer.abstractAppChunkFetch.execute();
    }

    private static initialize() {
        return AppInitializer.abstractAppController.initialize(AppInitializer.abstractAppChunkFetch.getChunk());
    }

}