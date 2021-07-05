export abstract class AbstractAppController {

    public abstract initialize(htmlChunk: string): Promise<any>;

    protected mountHtmlChunk(htmlChunk: string): void {

        // if (htmlChunk === null && htmlChunk === undefined) console.log("pre: htmlChunk null or undefined");

        let bodyElement: HTMLElement = document.body;
        bodyElement.innerHTML = htmlChunk.trim();

        // if (htmlChunk === null && htmlChunk === undefined) console.log("post: htmlChunk null or undefined");
    }

}