import {LoginElements} from "./LoginElements";

const CLASS_D_NONE: string = "d-none";
const CLASS_IS_INVALID: string = "is-invalid";

export class LoginView {

    public static getUsername(): string {
        return LoginElements.userInput().value;
    }

    public static getPassword(): string {
        return LoginElements.passwordInput().value;
    }

    public static clearPasswordField(): void {
        LoginElements.passwordInput().value = "";
    }

    public static focusOnUserInput(): void {
        LoginElements.userInput().focus();
    }

    public static focusOnPasswordInput(): void {
        LoginElements.passwordInput().focus();
    }

    public static markUsernameFieldAsInvalid(): void {
        LoginElements.userInput().classList.add(CLASS_IS_INVALID);
    }

    public static unmarkUsernameFieldAsInvalid(): void {
        LoginElements.userInput().classList.remove(CLASS_IS_INVALID);
    }

    public static markPasswordFiledAsInvalid(): void {
        LoginElements.passwordInput().classList.add(CLASS_IS_INVALID);
    }

    public static unmarkPasswordFiledAsInvalid(): void {
        LoginElements.passwordInput().classList.remove(CLASS_IS_INVALID);
    }

    public static isRememberMeChecked(): boolean {
        return LoginElements.rememberMeCheckBox().checked;
    }

    // public static isPrivacyConsentChecked(): boolean {
    //     return LoginElements.privacyConsentCheckBox().checked;
    // }
    //
    // public static markPrivacyConsentCheckBoxAsInvalid(): void {
    //     LoginElements.privacyConsentCheckBox().classList.add(CLASS_IS_INVALID);
    // }
    //
    // public static unmarkPrivacyConsentCheckBoxAsInvalid(): void {
    //     LoginElements.privacyConsentCheckBox().classList.remove(CLASS_IS_INVALID);
    // }

    public static hideAllAlerts(): void {
        LoginElements.authFailedAlert().classList.add(CLASS_D_NONE);
        LoginElements.generalExceptionAlert().classList.add(CLASS_D_NONE);
    }

    public static showAuthFailureAlert(): void {
        LoginElements.authFailedAlert().classList.remove(CLASS_D_NONE);
        LoginElements.generalExceptionAlert().classList.add(CLASS_D_NONE);
    }

    public static showGeneralFailureAlert(): void {
        LoginElements.authFailedAlert().classList.add(CLASS_D_NONE);
        LoginElements.generalExceptionAlert().classList.remove(CLASS_D_NONE);
    }

    public static showSubmitButtonSpinner(): void {
        LoginElements.submitButtonSpinner().classList.remove(CLASS_D_NONE);
    }

    public static hideSubmitButtonSpinner(): void {
        LoginElements.submitButtonSpinner().classList.add(CLASS_D_NONE);
    }


}