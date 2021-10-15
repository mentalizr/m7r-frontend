export class Button {

    public static disable(id: string): void {
        document.getElementById(id).setAttribute("disabled", "true");
        document.getElementById(id).classList.add("d-none", "d-sm-inline");
    }

    public static display(id: string): void {
        document.getElementById(id).removeAttribute("disabled");
        document.getElementById(id).classList.remove("d-none", "d-sm-inline");
    }

    public static hide(id: string): void {
        document.getElementById(id).removeAttribute("disabled");
        document.getElementById(id).classList.remove("d-sm-inline");
        document.getElementById(id).classList.add("d-none");
    }

}