export interface Infotext {
    id: string;
    name: string;
}

export interface Step {
    id: string;
    name: string;
}

export interface Submodule {
    id: string;
    name: string;
    steps: Step[];
}

export interface Module {
    id: string;
    name: string;
    submodules: Submodule[];
}

export interface Program {
    id: string;
    infotexts: Infotext[];
    modules: Module[];
    name: string;
    blocking: boolean;
}
