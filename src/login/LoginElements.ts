const ID_FORM: string = "login--form";
const ID_SUBMIT_BUTTON: string = "login--submit--button";
const ID_USER_INPUT: string = "login--user--input";
const ID_PASSWORD_INPUT: string = "login--password--input";
const ID_AUTH_FAILED_ALERT: string = "login--auth-failed--alert";
const ID_EXCEPTION_ALERT: string = "login--general-exception--alert";
const ID_SUBMIT_BUTTON_SPINNER: string = "login--submit-button--spinner";
const ID_REMEMBER_ME_CHECKBOX: string = "login--remember--input";
const ID_LOGIN_WITH_ACCESS_KEY_LINK: string = "login--login-access-key--link";
const ID_CREDENTIALS_FORGOTTEN_LINK: string = "login--credentials-forgotten--link";
const ID_CREDENTIALS_FORGOTTEN_MODAL: string = "login--credentials-forgotten--modal";
const ID_IMPRINT_LINK: string = "login--imprint--link";
const ID_IMPRINT_MODAL: string = "login--imprint--modal";
const ID_IMPRINT_MODAL_BODY: string = "login--imprint--modal-body";
const ID_POLICY_LINK: string = "login--policy--link";
const ID_POLICY_MODAL: string = "login--policy--modal";
const ID_POLICY_MODAL_BODY: string = "login--policy--modal-body";


export class LoginElements {

    public static form(): HTMLElement {
        return document.getElementById(ID_FORM);
    }

    public static submitButton(): HTMLElement {
        return document.getElementById(ID_SUBMIT_BUTTON);
    }

    public static userInput(): HTMLInputElement {
        return <HTMLInputElement>document.getElementById(ID_USER_INPUT);
    }

    public static passwordInput(): HTMLInputElement {
        return <HTMLInputElement>document.getElementById(ID_PASSWORD_INPUT);
    }

    public static rememberMeCheckBox(): HTMLInputElement {
        return <HTMLInputElement>document.getElementById(ID_REMEMBER_ME_CHECKBOX)
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

    public static loginWithAccessKeyLink(): HTMLElement {
        return document.getElementById(ID_LOGIN_WITH_ACCESS_KEY_LINK);
    }

    public static credentialsForgottenLink(): HTMLElement {
        return document.getElementById(ID_CREDENTIALS_FORGOTTEN_LINK);
    }

    public static credentialsForgottenModalId(): string {
        return ID_CREDENTIALS_FORGOTTEN_MODAL;
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