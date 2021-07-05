import {AbstractAppChunkFetch} from "./AbstractAppChunkFetch";

const CHUNK_NAME: string = "patient";

export class AppChunkFetchPatient extends AbstractAppChunkFetch {

    constructor() {
        super(CHUNK_NAME);
    }

}