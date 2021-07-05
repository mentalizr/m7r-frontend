export class Fader {

    public static hide(element: HTMLElement): void {
        Fader.setOpacity(element, 0);
    }

    // See: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css/18760338#18760338

    public static fadeIn(element: HTMLElement): Promise<unknown> {
        return new Promise<void>((resolve) => {
            let op: number = 0.1;  // initial opacity
            Fader.setOpacity(element, op);
            element.style.display = 'block';
            var timer = setInterval(function () {
                if (op >= 1){
                    clearInterval(timer);
                    resolve();
                }

                Fader.setOpacity(element, op);
                op += op * 0.1;
            }, 40);

        });
    }

    public static fadeOut(element: HTMLElement): Promise<unknown> {
        return new Promise<void>(((resolve) => {
            let op = 1;  // initial opacity
            var timer = setInterval(function () {
                if (op <= 0.1){
                    clearInterval(timer);
                    element.style.display = 'none';
                    resolve();
                }
                Fader.setOpacity(element, op);
                op -= op * 0.1;
            }, 40);
        }));
    }

    private static setOpacity(element: HTMLElement, opacity: number): void {
        element.style.opacity = "" + opacity;
        element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
    }

}