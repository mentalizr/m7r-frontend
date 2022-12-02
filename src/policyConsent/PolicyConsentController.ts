import {AbstractAppController} from "../application/AbstractAppController";
import {Dispatcher} from "../routing/Dispatcher";
import {PolicyConsentElements} from "./PolicyConsentElements";
import {Logger} from "../helper/Logger";
import {LogoutHelper} from "../general/logout/LogoutHelper";
import {ConsentPolicyFetch} from "../application/ConsentPolicyFetch";

export class PolicyConsentController extends AbstractAppController {

    public initialize(htmlChunk: string): Promise<any> {

        this.mountHtmlChunk(htmlChunk);
        PolicyConsentController.registerUserEvents();

        return Promise.resolve(undefined);
    }

    private static registerUserEvents(): void {

        PolicyConsentElements.buttonAccept().addEventListener("click", function (event) {
            Logger("button 'accept' clicked.")
            event.preventDefault();
            ConsentPolicyFetch.execute()
                .then(function () {
                    Dispatcher.restart();
                });
        });

        PolicyConsentElements.buttonReject().addEventListener("click", function (event) {
            Logger("button 'reject' clicked.")
            event.preventDefault();
            LogoutHelper.logoutAndRestart();
        });


        // LoginElements.credentialsForgottenLink().addEventListener("click", function (event) {
        //     event.preventDefault();
        //     Modal.show(LoginElements.credentialsForgottenModalId());
        // });
        //
        // LoginElements.loginWithAccessKeyLink().addEventListener("click", function (event) {
        //     event.preventDefault();
        //     Dispatcher.toVoucher();
        // });
        //
        // LoginElements.submitButton().addEventListener("click", function (event) {
        //     event.preventDefault();
        //     LoginController.submit();
        // });
        //
        // window.addEventListener("keydown", LoginController.keydownHandler);
    }

    private static unregisterUserEvents(): void {
        // window.removeEventListener("keydown", LoginController.keydownHandler);
    }

    private static keydownHandler(event: KeyboardEvent) {
        // if (event.key === "Enter") {
        //     event.preventDefault();
        //     LoginController.submit();
        // }
    }

    private static submit(): void {

        // const password: string = LoginView.getPassword();
        // const isPasswordSet = password.length > 0;
        // const rememberMe: boolean = LoginView.isRememberMeChecked();
        //
        // if (isPasswordSet) {
        //     LoginView.unmarkPasswordFiledAsInvalid();
        // } else {
        //     LoginView.hideAllAlerts();
        //     LoginView.markPasswordFiledAsInvalid();
        //     LoginView.focusOnPasswordInput();
        // }
        //
        // const username: string = LoginView.getUsername();
        // const isUserNameSet = username.length > 0;
        // if (isUserNameSet) {
        //     LoginView.unmarkUsernameFieldAsInvalid();
        // } else {
        //     LoginView.markUsernameFieldAsInvalid();
        //     LoginView.hideAllAlerts();
        //     LoginView.focusOnUserInput();
        // }
        //
        // const privacyConsentAccepted: boolean = LoginView.isPrivacyConsentChecked();
        // if (privacyConsentAccepted) {
        //     LoginView.unmarkPrivacyConsentCheckBoxAsInvalid();
        // } else {
        //     LoginView.markPrivacyConsentCheckBoxAsInvalid();
        //     LoginView.hideAllAlerts();
        // }
        //
        // const readyForSubmit = isUserNameSet && isPasswordSet && privacyConsentAccepted;
        // if (readyForSubmit) {
        //     LoginController.loginOnServer(username, password, rememberMe);
        // }
    }

    private static loginOnServer(username: string, password: string, rememberMe: boolean) {

        // const serviceUrl = SERVICE_BASE + "/" + "login";
        // const data: string = "user=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password) + "&rememberMe=" + rememberMe;
        //
        // LoginView.showSubmitButtonSpinner();
        //
        // fetch(serviceUrl,
        //     {
        //         method: "post",
        //         headers: {"Content-type": "application/x-www-form-urlencoded; charset=utf-8"},
        //         body: data
        //     })
        //     .then(function (response) {
        //         return RestResponse.check(serviceUrl, response);
        //     })
        //     .then(function (response) {
        //         LoginController.unregisterUserEvents();
        //         AppInitializer.start();
        //     })
        //     .catch((error) => {
        //
        //         if (LoginController.isUnauthorizedError(error)) {
        //             LoginView.showAuthFailureAlert();
        //             LoginController.resetViewAfterFailure();
        //         } else {
        //             LoginView.showGeneralFailureAlert();
        //             LoginController.resetViewAfterFailure();
        //         }
        //     });
    }

    // private static isUnauthorizedError(error: any): boolean {
    //     if (error instanceof FetchResponseError) {
    //         const fetchResponseError: FetchResponseError = <FetchResponseError>error;
    //         if (fetchResponseError.getStatus() === 401) return true;
    //     }
    //     return false;
    // }
    //
    // private static resetViewAfterFailure(): void {
    //     LoginView.hideSubmitButtonSpinner();
    //     LoginView.clearPasswordField();
    //     LoginView.focusOnPasswordInput();
    // }

}