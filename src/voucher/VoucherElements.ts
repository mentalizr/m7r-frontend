const ID_FORM: string = "login-voucher--form";
const ID_SUBMIT_BUTTON: string = "login-voucher--submit--button";
const ID_ACCESS_KEY_INPUT: string = "login-voucher--access-key--input";
const ID_AUTH_FAILED_ALERT: string = "login-voucher--auth-failed--alert";
const ID_EXCEPTION_ALERT: string = "login-voucher--general-exception--alert";
const ID_SUBMIT_BUTTON_SPINNER: string = "login-voucher--submit-button--spinner";
const ID_REMEMBER_ME_CHECKBOX: string = "login-voucher--remember--input";
const ID_LOGIN_WITH_CREDENTIALS_LINK: string = "login-voucher--login-credentials--link";
const ID_ACCESS_KEY_FORGOTTEN_LINK: string = "login-voucher--access-key-forgotten--link";
const ID_ACCESS_KEY_FORGOTTEN_MODAL: string = "login-voucher--access-key-forgotten--modal";
const ID_IMPRINT_LINK: string = "login-voucher--imprint--link";
const ID_IMPRINT_MODAL: string = "login-voucher--imprint--modal";
const ID_IMPRINT_MODAL_BODY: string = "login-voucher--imprint--modal-body";
const ID_POLICY_LINK: string = "login-voucher--policy--link";
const ID_POLICY_MODAL: string = "login-voucher--policy--modal";
const ID_POLICY_MODAL_BODY: string = "login-voucher--policy--modal-body";


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

    public static imprintLink(): HTMLElement {
        return document.getElementById(ID_IMPRINT_LINK);
    }

    public static imprintModalId(): string {
        return ID_IMPRINT_MODAL;
    }

    public static imprintModalBody(): HTMLElement {
        return document.getElementById(ID_IMPRINT_MODAL_BODY);
    }

    public static policyLink(): HTMLElement {
        return document.getElementById(ID_POLICY_LINK);
    }

    public static policyModalId(): string {
        return ID_POLICY_MODAL;
    }

    public static policyModalBody(): HTMLElement {
        return document.getElementById(ID_POLICY_MODAL_BODY);
    }


}