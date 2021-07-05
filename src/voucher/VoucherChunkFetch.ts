import {AbstractAppChunkFetch} from "../application/AbstractAppChunkFetch";

const CHUNK_NAME: string = "login_voucher";

export class VoucherChunkFetch extends AbstractAppChunkFetch {

    constructor() {
        super(CHUNK_NAME);
    }

}