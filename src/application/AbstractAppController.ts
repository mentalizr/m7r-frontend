export abstract class AbstractAppController {

    public abstract initialize(htmlChunk: string): Promise<any>;

    protected mountHtmlChunk(htmlChunk: string): void {

        let bodyElement: HTMLElement = document.body;
        bodyElement.innerHTML = htmlChunk.trim();

    }

}