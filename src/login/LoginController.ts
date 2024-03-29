import {SERVICE_BASE} from "../Globals";
import {RestResponse} from "../helper/RestResponse";
import {FetchResponseError} from "../patient/content/mainContent/formDataPersist/rest/FetchResponseError";
import {LoginView} from "./LoginView";
import {LoginElements} from "./LoginElements";
import {AbstractAppController} from "../application/AbstractAppController";
import {Modal} from "../helper/Modal";
import {Dispatcher} from "../routing/Dispatcher";
import {VoucherView} from "../voucher/VoucherView";
import {HtmlChunkFetch} from "../application/HtmlChunkFetch";
import {VoucherElements} from "../voucher/VoucherElements";
import {Logger} from "../helper/Logger";

export class LoginController extends AbstractAppController {

    public initialize(htmlChunk: string): Promise<any> {

        this.mountHtmlChunk(htmlChunk);

        LoginView.focusOnUserInput();
        LoginController.registerUserEvents();

        return Promise.resolve(undefined);
    }

    private static registerUserEvents(): void {

        LoginElements.credentialsForgottenLink().addEventListener("click", function (event) {
            event.preventDefault();
            Modal.show(LoginElements.credentialsForgottenModalId());
        });

        LoginElements.loginWithAccessKeyLink().addEventListener("click", function (event) {
            event.preventDefault();
            Dispatcher.toVoucher();
        });

        LoginElements.imprintLink().addEventListener("click", function (event) {
            event.preventDefault();
            LoginController.showImprintModal();
        });

        LoginElements.policyLink().addEventListener("click", function (event) {
            event.preventDefault();
            LoginController.showPolicyModal();
        });

        LoginElements.submitButton().addEventListener("click", function (event) {
            event.preventDefault();
            LoginController.submit();
        });

        window.addEventListener("keydown", LoginController.keydownHandler);
    }

    private static unregisterUserEvents(): void {
        window.removeEventListener("keydown", LoginController.keydownHandler);
    }

    private static keydownHandler(event: KeyboardEvent) {
        if (event.key === "Enter") {
            event.preventDefault();
            LoginController.submit();
        }
    }

    private static submit(): void {

        const password: string = LoginView.getPassword();
        const isPasswordSet = password.length > 0;
        const rememberMe: boolean = LoginView.isRememberMeChecked();

        if (isPasswordSet) {
            LoginView.unmarkPasswordFiledAsInvalid();
        } else {
            LoginView.hideAllAlerts();
            LoginView.markPasswordFiledAsInvalid();
            LoginView.focusOnPasswordInput();
        }

        const username: string = LoginView.getUsername();
        const isUserNameSet = username.length > 0;
        if (isUserNameSet) {
            LoginView.unmarkUsernameFieldAsInvalid();
        } else {
            LoginView.markUsernameFieldAsInvalid();
            LoginView.hideAllAlerts();
            LoginView.focusOnUserInput();
        }

        const readyForSubmit = isUserNameSet && isPasswordSet;
        if (readyForSubmit) {
            LoginController.loginOnServer(username, password, rememberMe);
        }
    }

    private static loginOnServer(username: string, password: string, rememberMe: boolean) {

        const serviceUrl = SERVICE_BASE + "/" + "login";
        const data: string = "user=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password) + "&rememberMe=" + rememberMe;

        LoginView.showSubmitButtonSpinner();

        fetch(serviceUrl,
            {
                method: "post",
                headers: {"Content-type": "application/x-www-form-urlencoded; charset=utf-8"},
                body: data
            })
            .then(function (response) {
                return RestResponse.check(serviceUrl, response);
            })
            .then(function (response) {
                Dispatcher.restart();
            })
            .catch((error) => {

                if (LoginController.isUnauthorizedError(error)) {
                    LoginView.showAuthFailureAlert();
                    LoginController.resetViewAfterFailure();
                } else {
                    LoginView.showGeneralFailureAlert();
                    LoginController.resetViewAfterFailure();
                }
            });
    }

    private static isUnauthorizedError(error: any): boolean {
        if (error instanceof FetchResponseError) {
            const fetchResponseError: FetchResponseError = <FetchResponseError>error;
            if (fetchResponseError.getStatus() === 401) return true;
        }
        return false;
    }

    private static resetViewAfterFailure(): void {
        LoginView.hideSubmitButtonSpinner();
        LoginView.clearPasswordField();
        LoginView.focusOnPasswordInput();
    }

    private static showImprintModal(): void {
        LoginView.hideAllAlerts();
        let htmlChunkFetch: HtmlChunkFetch = new HtmlChunkFetch("imprint");
        htmlChunkFetch.execute()
            .then(function () {
                let imprintModalBody: HTMLElement = LoginElements.imprintModalBody();
                imprintModalBody.innerHTML = htmlChunkFetch.getHtmlChunk().trim();
                Modal.show(LoginElements.imprintModalId());
            })
            .catch((error) => {
                Logger(error);
                LoginView.showGeneralFailureAlert();
                LoginController.resetViewAfterFailure();
            })
    }

    private static showPolicyModal(): void {
        LoginView.hideAllAlerts();
        let htmlChunkFetch: HtmlChunkFetch = new HtmlChunkFetch("policy_modal");
        htmlChunkFetch.execute()
            .then(function () {
                let policyModalBody: HTMLElement = LoginElements.policyModalBody();
                policyModalBody.innerHTML = htmlChunkFetch.getHtmlChunk().trim();
                Modal.show(LoginElements.policyModalId());
            })
            .catch((error) => {
                Logger(error);
                LoginView.showGeneralFailureAlert();
                LoginController.resetViewAfterFailure();
            })
    }

}