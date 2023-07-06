import {AbstractAppChunkFetch} from "./AbstractAppChunkFetch";

const CHUNK_NAME: string = "policy_consent";

export class AppChunkFetchPolicyConsent extends AbstractAppChunkFetch {

    constructor() {
        super(CHUNK_NAME);
    }

}