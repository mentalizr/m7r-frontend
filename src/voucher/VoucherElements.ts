const ID_FORM: string = "login-voucher--form";
const ID_SUBMIT_BUTTON: string = "login-voucher--submit--button";
const ID_ACCESS_KEY_INPUT: string = "login-voucher--access-key--input";
const ID_AUTH_FAILED_ALERT: string = "login-voucher--auth-failed--alert";
const ID_EXCEPTION_ALERT: string = "login-voucher--general-exception--alert";
const ID_SUBMIT_BUTTON_SPINNER: string = "login-voucher--submit-button--spinner";
const ID_REMEMBER_ME_CHECKBOX: string = "login-voucher--remember--input";
const ID_PRIVACY_CONSENT_CHECKBOX: string = "login-voucher--privacy-consent--input";
const ID_PRIVACY_CONSENT_LINK: string = "login-voucher--privacy-consent--link";
const ID_PRIVACY_CONSENT_MODAL: string = "login-voucher--privacy-consent--modal";
const ID_LOGIN_WITH_CREDENTIALS_LINK: string = "login-voucher--login-credentials--link";
const ID_ACCESS_KEY_FORGOTTEN_LINK: string = "login-voucher--access-key-forgotten--link";
const ID_ACCESS_KEY_FORGOTTEN_MODAL: string = "login-voucher--access-key-forgotten--modal";

export class VoucherElements {

    public static form(): HTMLElement {
        return document.getElementById(ID_FORM);
    }

    public static submitButton(): HTMLElement {
        return document.getElementById(ID_SUBMIT_BUTTON);
    }

    public static accessKey(): HTMLInputElement {
        return <HTMLInputElement>document.getElementById(ID_ACCESS_KEY_INPUT);
    }

    public static rememberMeCheckBox(): HTMLInputElement {
        return <HTMLInputElement>document.getElementById(ID_REMEMBER_ME_CHECKBOX);
    }

    public static privacyConsentCheckBox(): HTMLInputElement {
        return <HTMLInputElement>document.getElementById(ID_PRIVACY_CONSENT_CHECKBOX);
    }

    public static privacyConsentLink(): HTMLElement {
        return document.getElementById(ID_PRIVACY_CONSENT_LINK);
    }

    public static privacyConsentModalID(): string {
        return ID_PRIVACY_CONSENT_MODAL;
    }

    public static authFailedAlert(): HTMLElement {
        return document.getElementById(ID_AUTH_FAILED_ALERT);
    }

    public static generalExceptionAlert(): HTMLElement {
        return document.getElementById(ID_EXCEPTION_ALERT);
    }

    public static submitButtonSpinner(): HTMLElement {
        return document.getElementById(ID_SUBMIT_BUTTON_SPINNER);
    }

    public static loginWithCredentialsLink(): HTMLElement {
        return document.getElementById(ID_LOGIN_WITH_CREDENTIALS_LINK);
    }

    public static accessKeyForgottenLink(): HTMLElement {
        return document.getElementById(ID_ACCESS_KEY_FORGOTTEN_LINK);
    }

    public static accessKeyForgottenModalId(): string {
        return ID_ACCESS_KEY_FORGOTTEN_MODAL;
    }
}