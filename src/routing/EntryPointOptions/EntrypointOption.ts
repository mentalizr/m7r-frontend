import {AbstractAppChunkFetch} from "../../application/AbstractAppChunkFetch";
import {AbstractAppController} from "../../application/AbstractAppController";
import {VoucherChunkFetch} from "../../voucher/VoucherChunkFetch";
import {VoucherController} from "../../voucher/VoucherController";
import {LoginChunkFetch} from "../../login/LoginChunkFetch";
import {LoginController} from "../../login/LoginController";
import {EntryPoint} from "./EntryPoint";

export class EntrypointOption {

    private readonly _abstractAppChunkFetch: AbstractAppChunkFetch;
    private readonly _abstractAppController: AbstractAppController;

    constructor() {
        const entryPoint = new EntryPoint();
        if (entryPoint.isVoucher) {
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