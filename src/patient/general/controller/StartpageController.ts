const ID_STARTPAGE_LINK = "global-startpage--link";
const ID_BRAND_ICON_LINK = "global-brand_icon--link";

export class StartpageController {

    public static registerClick() {

        document.getElementById(ID_STARTPAGE_LINK).addEventListener("click", function (event) {
            event.preventDefault();
            location.reload();
        });

        document.getElementById(ID_BRAND_ICON_LINK).addEventListener("click", function (event) {
            event.preventDefault();
            location.reload();

        });

    }

}