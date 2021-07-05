import {ID_MAIN_CONTENT} from "../../../Globals";

export class MediaElementCleaner {

    // https://stackoverflow.com/questions/3258587/how-to-properly-unload-destroy-a-video-element
    // https://html.spec.whatwg.org/multipage/media.html#best-practices-for-authors-using-media-elements
    // https://stackoverflow.com/questions/59956893/how-to-remove-source-audio-file-in-html5-audio-player-via-javascript

    public static clean(): void {

        document.querySelectorAll("#" + ID_MAIN_CONTENT + " video").forEach(function(element){

            // console.log("Clean-up media element of type video.");

            const videoElement: HTMLVideoElement = <HTMLVideoElement> element;
            videoElement.pause();
            videoElement.removeAttribute("src");
            videoElement.load();
        });

        document.querySelectorAll("#" + ID_MAIN_CONTENT + " audio").forEach(function (element) {

            // console.log("Clean-up media element of type audio.");

            const audioElement: HTMLAudioElement = <HTMLAudioElement> element;
            audioElement.pause();
            audioElement.innerHTML = "";
            audioElement.load();

        });
    }

}