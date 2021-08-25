import {Fader} from "../../helper/Fader";

const ID_SCROLL_UP_LINK = "global-scroll_up--link";

export class ScrollUpController {

    private static isShown: boolean = false;

    public static register(): void {
        ScrollUpController.registerShow();
        ScrollUpController.registerClick();
    }

    public static hide(): void {
        ScrollUpController.isShown = false;
        let scrollUpButton: HTMLElement = document.getElementById(ID_SCROLL_UP_LINK);
        scrollUpButton.style.display = "none";
    }

    private static registerShow() {

        let scrollUpButton: HTMLElement = document.getElementById(ID_SCROLL_UP_LINK);

        window.onscroll = function() {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {

                // console.log("fade in ... " + document.documentElement.scrollTop + " isShown: " + ScrollUpController.isShown);

                if (ScrollUpController.isShown === false) {
                    ScrollUpController.isShown = true;
                    Fader.fadeIn(scrollUpButton)
                        .then(function () {
                            ScrollUpController.checkConsistency(scrollUpButton);
                        });
                }

            } else {
                // console.log("fade out ... " + document.documentElement.scrollTop + " isShown:" + ScrollUpController.isShown);

                if (ScrollUpController.isShown === true) {
                    ScrollUpController.isShown = false;
                    Fader.fadeOut(scrollUpButton)
                        .then(function () {
                            ScrollUpController.checkConsistency(scrollUpButton);
                        });
                }
            }
        }
    }

    private static checkConsistency(scrollUpButton: HTMLElement) {
        if (ScrollUpController.isShown) {
            scrollUpButton.style.display = "block";
        } else {
            scrollUpButton.style.display = "none";
        }
    }

    private static registerClick() {
        document.getElementById(ID_SCROLL_UP_LINK).addEventListener("click", function (event) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

}