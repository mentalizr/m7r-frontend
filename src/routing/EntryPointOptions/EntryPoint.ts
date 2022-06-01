const META_ENTRY_VOUCHER = "LOGIN_VOUCHER";
const META_ENTRY_LOGIN = "LOGIN";

export class EntryPoint {

    private readonly entryPoint: string;

    constructor() {
        this.entryPoint = document.querySelector("meta[name='entry']").getAttribute("content");
        // console.log("Entry: " + entry);
    }

    get isLogin(): boolean {
        return (this.entryPoint === META_ENTRY_LOGIN);
    }

    get isVoucher(): boolean {
        return (this.entryPoint === META_ENTRY_VOUCHER);
    }

}