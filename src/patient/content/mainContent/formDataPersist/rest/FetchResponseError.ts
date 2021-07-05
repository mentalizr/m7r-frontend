export class FetchResponseError extends Error {

    private _service: string;
    private _status: number;
    private _statusText: string;

    constructor(service: string, status: number, statusText: string) {
        super("FetchResponseError [" + service + "] " + status + " " + statusText);
        this._service = service;
        this._status = status;
        this._statusText = statusText;
    }

    public getService(): string {
        return this._service;
    }

    public getStatus(): number {
        return this._status;
    }

    public getStatusText(): string {
        return this._statusText;
    }


}