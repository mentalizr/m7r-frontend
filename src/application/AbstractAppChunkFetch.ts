import {HtmlChunkFetch} from "../patient/general/fetch/HtmlChunkFetch";

export abstract class AbstractAppChunkFetch {

    protected chunkName: string;
    protected htmlChunkFetch: HtmlChunkFetch;

    protected constructor(chunkName: string) {
        this.chunkName = chunkName;
        this.htmlChunkFetch = new HtmlChunkFetch(chunkName);
    }

    public execute() {
        return this.htmlChunkFetch.execute();
    }

    public getChunk() {
        return this.htmlChunkFetch.getHtmlChunk();
    }

}