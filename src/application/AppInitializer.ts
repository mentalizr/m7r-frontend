import {SessionStatusFetch} from "./SessionStatusFetch";
import {SessionStatus} from "../patient/general/entities/SessionStatus";
import {AbstractAppChunkFetch} from "./AbstractAppChunkFetch";
import {AppChunkFetchPatient} from "./AppChunkFetchPatient";
import {AbstractAppController} from "./AbstractAppController";
import {PatientAppController} from "../patient/general/controller/PatientAppController";
import {Logger} from "../helper/Logger";
import {EntrypointOption} from "../routing/EntryPointOptions/EntrypointOption";

const USER_ROLE_PATIENT = "PATIENT";
const USER_ROLE_THERAPIST = "THERAPIST";
const USER_ROLE_ADMIN = "ADMIN";

export class AppInitializer {

    private static abstractAppChunkFetch: AbstractAppChunkFetch = undefined;
    private static abstractAppController: AbstractAppController = undefined;

    public static start(): void {

        AppInitializer.execute()
            .then(function () {
                // console.log("Application is initialized!");
            });

    }

    public static execute(): Promise<void> {

        return SessionStatusFetch.execute()
            .then(AppInitializer.build)
            .then(AppInitializer.fetchChunk)
            .then(AppInitializer.initialize);

    }

    private static build() {

        const sessionStatus: SessionStatus = SessionStatusFetch.sessionStatus;

        if (!sessionStatus.valid) {

            const entryPointOption: EntrypointOption = new EntrypointOption();

            // AppInitializer.abstractAppChunkFetch = new LoginChunkFetch();
            // AppInitializer.abstractAppController = new LoginController();

            AppInitializer.abstractAppChunkFetch = entryPointOption.abstractAppChunkFetch;
            AppInitializer.abstractAppController = entryPointOption.abstractAppController;

        } else if (sessionStatus.userRole.toLowerCase() === USER_ROLE_PATIENT.toLowerCase()) {
            AppInitializer.abstractAppChunkFetch = new AppChunkFetchPatient();
            AppInitializer.abstractAppController = new PatientAppController();

        } else {
            Logger("Error: Unrecognized user role: " + sessionStatus.userRole);
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