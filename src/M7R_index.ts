import {AppController} from "./patient/general/controller/AppController";
import {AppInitializer} from "./application/AppInitializer";

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// docReady(AppController.initApp());

docReady(AppInitializer.start());

// $(document).ready(function () {
//
//     $.ajaxSetup({
//         cache: false
//     });
//
//     AppController.initApp();
//
// });

