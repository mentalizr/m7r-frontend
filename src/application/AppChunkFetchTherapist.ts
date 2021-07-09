import {AbstractAppChunkFetch} from "./AbstractAppChunkFetch";

const CHUNK_NAME: string = "therapist";

export class AppChunkFetchTherapist extends AbstractAppChunkFetch {

    constructor() {
        super(CHUNK_NAME);
    }

}