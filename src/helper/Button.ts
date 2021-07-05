export class Button {

    public static disable(id: string): void {
        document.getElementById(id).setAttribute("disabled", "true");
    }

    public static enable(id: string): void {
        document.getElementById(id).removeAttribute("disabled");
    }

    public static display(id: string): void {
        document.getElementById(id).classList.remove("d-none");
    }

    public static hide(id: string): void {
        document.getElementById(id).classList.add("d-none");
    }

}