import {AbstractAppChunkFetch} from "../application/AbstractAppChunkFetch";

const CHUNK_NAME: string = "login";

export class LoginChunkFetch extends AbstractAppChunkFetch {

    constructor() {
        super(CHUNK_NAME);
    }

}