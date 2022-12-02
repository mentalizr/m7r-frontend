import {LogoutRest} from "./LogoutRest";
import {Dispatcher} from "../../routing/Dispatcher";
import {ErrorHandler} from "../error/ErrorHandler";

export class LogoutHelper {

    public static logoutAndRestart() {
        LogoutRest.execute()
            .then(function() {
                Dispatcher.restart();
            })
            .catch(ErrorHandler.handleError);
    }

}