import {LogoutRest} from "./LogoutRest";
import {Logger} from "../../helper/Logger";
import {FetchResponseError} from "../../patient/content/mainContent/formDataPersist/rest/FetchResponseError";
import {AppInitializer} from "../../application/AppInitializer";
import {Dispatcher} from "../../routing/Dispatcher";

const ID_LOGOUT_LINK = "general-logout--link";

export class LogoutController {

    public static registerClickLogout() {

        let logoutLink = document.getElementById(ID_LOGOUT_LINK);

        logoutLink.addEventListener("click", function(event) {

            event.preventDefault();

            LogoutRest.execute()
                .then(function() {
                    // location.reload();
                    // AppInitializer.start();
                    Dispatcher.toVoucher();
                })
                .catch(function(error: FetchResponseError) {
                    Logger("Fehler beim Aufruf von Logout. Error: " + error.getStatus() + " " + error.getStatusText());
                })
        })
    }

}