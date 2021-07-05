import {AbstractAppChunkFetch} from "../../application/AbstractAppChunkFetch";
import {AbstractAppController} from "../../application/AbstractAppController";
import {VoucherChunkFetch} from "../../voucher/VoucherChunkFetch";
import {VoucherController} from "../../voucher/VoucherController";
import {LoginChunkFetch} from "../../login/LoginChunkFetch";
import {LoginController} from "../../login/LoginController";

const META_ENTRY_VOUCHER = "LOGIN_VOUCHER";

export class EntrypointOption {

    private readonly _abstractAppChunkFetch: AbstractAppChunkFetch;
    private readonly _abstractAppController: AbstractAppController;

    constructor() {

        const entry: string = document.querySelector("meta[name='entry']").getAttribute("content");

        // console.log("Entry: " + entry);

        if (entry === META_ENTRY_VOUCHER) {
            this._abstractAppChunkFetch = new VoucherChunkFetch();
            this._abstractAppController = new VoucherController();
        } else {
            this._abstractAppChunkFetch = new LoginChunkFetch();
            this._abstractAppController = new LoginController();
        }
    }

    get abstractAppChunkFetch(): AbstractAppChunkFetch {
        return this._abstractAppChunkFetch;
    }

    get abstractAppController(): AbstractAppController {
        return this._abstractAppController;
    }
}