import {AbstractAppChunkFetch} from "./AbstractAppChunkFetch";

const CHUNK_NAME: string = "policy";

export class AppChunkFetchPolicy extends AbstractAppChunkFetch {

    constructor() {
        super(CHUNK_NAME);
    }

}