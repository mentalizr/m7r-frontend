import {EntryPoint} from "./EntryPointOptions/EntryPoint";

export class Dispatcher {

    public static toLogin(): void {
        window.location.href = "login";
    }

    public static toVoucher(): void {
        window.location.href = "voucher";
    }

    // this will bring the user back to the login screen he came from
    // this is not necessarily the configured one.
    public static restart(): void {
        const entryPoint = new EntryPoint();
        if (entryPoint.isVoucher) {
            Dispatcher.toVoucher();
        } else {
            Dispatcher.toLogin();
        }
    }

}