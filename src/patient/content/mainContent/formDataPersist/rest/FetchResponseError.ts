export class FetchResponseError extends Error {

    private readonly service: string;
    private readonly status: number;
    private readonly statusText: string;

    constructor(service: string, status: number, statusText: string) {
        super("FetchResponseError [" + service + "] " + status + " " + statusText);
        this.service = service;
        this.status = status;
        this.statusText = statusText;
    }

    public getService(): string {
        return this.service;
    }

    public getStatus(): number {
        return this.status;
    }

    public getStatusText(): string {
        return this.statusText;
    }

}