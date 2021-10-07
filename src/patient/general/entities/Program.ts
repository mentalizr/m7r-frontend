export interface Infotext {
    id: string;
    name: string;
}

export interface Step {
    id: string;
    name: string;
    exercise: boolean;
    feedback: boolean;
    accessible: boolean;
}

export interface Submodule {
    id: string;
    name: string;
    accessible: boolean;
    steps: Step[];
}

export interface Module {
    id: string;
    name: string;
    accessible: boolean;
    submodules: Submodule[];
}

export interface Program {
    id: string;
    infotexts: Infotext[];
    modules: Module[];
    name: string;
    blocking: boolean;
}
