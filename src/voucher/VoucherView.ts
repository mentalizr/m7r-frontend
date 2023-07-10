import {VoucherElements} from "./VoucherElements";

const CLASS_D_NONE: string = "d-none";
const CLASS_IS_INVALID: string = "is-invalid";

export class VoucherView {

    public static getAccessKey(): string {
        return VoucherElements.accessKey().value;
    }

    public static isRememberMeChecked(): boolean {
        return VoucherElements.rememberMeCheckBox().checked;
    }

    public static clearAccessKeyField(): void {
        VoucherElements.accessKey().value = "";
    }

    public static focusOnAccessKeyInput(): void {
        VoucherElements.accessKey().focus();
    }

    public static markAccessKeyFieldAsInvalid(): void {
        VoucherElements.accessKey().classList.add(CLASS_IS_INVALID);
    }

    public static unmarkAccessKeyFieldAsInvalid(): void {
        VoucherElements.accessKey().classList.remove(CLASS_IS_INVALID);
    }

    public static hideAllAlerts(): void {
        VoucherElements.authFailedAlert().classList.add(CLASS_D_NONE);
        VoucherElements.generalExceptionAlert().classList.add(CLASS_D_NONE);
    }

    public static showAuthFailureAlert(): void {
        VoucherElements.authFailedAlert().classList.remove(CLASS_D_NONE);
        VoucherElements.generalExceptionAlert().classList.add(CLASS_D_NONE);
    }

    public static showGeneralFailureAlert(): void {
        VoucherElements.authFailedAlert().classList.add(CLASS_D_NONE);
        VoucherElements.generalExceptionAlert().classList.remove(CLASS_D_NONE);
    }

    public static showSubmitButtonSpinner(): void {
        VoucherElements.submitButtonSpinner().classList.remove(CLASS_D_NONE);
    }

    public static hideSubmitButtonSpinner(): void {
        VoucherElements.submitButtonSpinner().classList.add(CLASS_D_NONE);
    }

}