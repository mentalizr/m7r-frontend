import {SERVICE_BASE} from "../Globals";
import {RestResponse} from "../helper/RestResponse";
import {FetchResponseError} from "../patient/content/mainContent/formDataPersist/rest/FetchResponseError";
import {VoucherView} from "./VoucherView";
import {VoucherElements} from "./VoucherElements";
import {AbstractAppController} from "../application/AbstractAppController";
import {AppInitializer} from "../application/AppInitializer";
import {Modal} from "../helper/Modal";
import {Dispatcher} from "../routing/Dispatcher";

export class VoucherController extends AbstractAppController {

    public initialize(htmlChunk: string): Promise<any> {

        this.mountHtmlChunk(htmlChunk);

        VoucherView.focusOnAccessKeyInput();
        VoucherController.registerUserEvents();

        return Promise.resolve(undefined);
    }

    private static registerUserEvents(): void {

        VoucherElements.privacyConsentLink().addEventListener("click", function (event) {
            event.preventDefault();
            Modal.show(VoucherElements.privacyConsentModalID());
        });

        VoucherElements.accessKeyForgottenLink().addEventListener("click", function (event) {
            event.preventDefault();
            Modal.show(VoucherElements.accessKeyForgottenModalId());
        });

        VoucherElements.loginWithCredentialsLink().addEventListener("click", function (event) {
            event.preventDefault();
            Dispatcher.toLogin();
        });

        VoucherElements.submitButton().addEventListener("click", function (event) {
            event.preventDefault();
            VoucherController.submit();
        });

        window.addEventListener("keydown", VoucherController.keydownHandler);
    }

    private static unregisterEvents(): void {
        window.removeEventListener("keydown", VoucherController.keydownHandler);
    }

    private static keydownHandler(event: KeyboardEvent) {
        if (event.key === "Enter") {
            event.preventDefault();
            VoucherController.submit();
        }
    }

    private static submit(): void {

        const accessKey: string = VoucherView.getAccessKey();
        const rememberMe: boolean = VoucherView.isRememberMeChecked();
        const privacyConsentAccepted: boolean = VoucherView.isPrivacyConsentChecked();

        const isAccessKeySet = accessKey.length > 0;
        const readyForSubmit = isAccessKeySet && privacyConsentAccepted;

        if (readyForSubmit) {
            VoucherView.unmarkAccessKeyFieldAsInvalid();
            VoucherView.unmarkPrivacyConsentCheckBoxAsInvalid();
            VoucherController.loginOnServer(accessKey, rememberMe);
        } else if (!isAccessKeySet) {
            VoucherView.hideAllAlerts();
            VoucherView.markAccessKeyFieldAsInvalid();
            VoucherView.focusOnAccessKeyInput();
        } else if (!privacyConsentAccepted) {
            VoucherView.hideAllAlerts();
            VoucherView.markPrivacyConsentCheckBoxAsInvalid();
        }
    }

    private static loginOnServer(accessKey: string, rememberMe: boolean) {

        const serviceUrl = SERVICE_BASE + "/" + "loginAccessKey";
        const data: string = "accessKey=" + encodeURIComponent(accessKey) + "&rememberMe=" + rememberMe;

        VoucherView.showSubmitButtonSpinner();

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
                // VoucherController.unregisterEvents();
                // AppInitializer.start();
                Dispatcher.restart();
            })
            .catch((error) => {

                if (VoucherController.isUnauthorizedError(error)) {
                    VoucherView.showAuthFailureAlert();
                    VoucherController.resetViewAfterFailure();
                } else {
                    VoucherView.showGeneralFailureAlert();
                    VoucherController.resetViewAfterFailure();
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
        VoucherView.hideSubmitButtonSpinner();
        VoucherView.clearAccessKeyField();
        VoucherView.focusOnAccessKeyInput();
    }

}