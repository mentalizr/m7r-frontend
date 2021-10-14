import {Infotext, Program} from "../entities/Program";

export class InfotextStatus {

    private readonly programId: string;
    private readonly infotexts: Array<Infotext>;
    private infotextId: string = undefined;

    constructor(program: Program) {
        this.programId = program.id;
        this.infotexts = program.infotexts;
    }

    public isInfotextDisplayed(): boolean {
        return this.infotextId != undefined;
    }

    public updateStatusInfotextIsDisplayed(infotextId: string) {
        this.infotextId = infotextId;
    }

    public updateStatusInfotextNotDisplayed() {
        this.infotextId = undefined;
    }

    public getCurrentInfotextId(): string {
        if (!this.isInfotextDisplayed())
            throw new Error("Unchecked call of InfotextStatus.getCurrentInfotextId. No infotext displayed.");
        return this.infotextId;
    }

    public getInfotextIdForLinkId(infoLinkId): string {
        const infoNr = infoLinkId.substring(9, infoLinkId.length);
        return this.programId + "__info_" + infoNr;
    }

    public getCurrentInfotextName(): string {
        if (!this.isInfotextDisplayed())
            throw new Error("Unchecked call of InfotextStatus.getCurrentInfotextName. No infotext displayed.");

        for (let infotext of this.infotexts) {
            if (infotext.id == this.infotextId) return infotext.name;
        }

        throw new Error("Inconsistency detected. No infotext found with current id [" + this.infotextId + "]");
    }

}