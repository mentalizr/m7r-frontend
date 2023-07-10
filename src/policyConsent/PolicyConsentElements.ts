const ID_BUTTON_ACCEPT: string = "policy_consent--button--accept";
const ID_BUTTON_REJECT: string = "policy_consent--button--reject";

export class PolicyConsentElements {

    public static buttonAccept(): HTMLElement {
        return document.getElementById(ID_BUTTON_ACCEPT);
    }

    public static buttonReject(): HTMLElement {
        return document.getElementById(ID_BUTTON_REJECT);
    }

}