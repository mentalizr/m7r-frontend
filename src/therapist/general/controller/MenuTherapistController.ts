import {ModelTherapist} from "../model/ModelTherapist";
import {ID_LOGO} from "../../../Globals";
import {AppConfigTherapist} from "../entities/AppConfigTherapist";

const ID_MENU_ITEM_TEMPLATE = "menu-item-template";
const ID_MENU_ITEM_LIST = "menu-item-list";
const ID_SIDEBAR_TOGGLE = "sidebarToggle";
const ID_SIDEBAR_TOGGLE_TOP = "sidebarToggleTop";
const ID_PROGRAM_NAME_HEADING = "program-name-heading";

const CLASS_SUBMODULE = "collapse-item";
const CLASS_SIDEBAR_TOGGLED = "sidebar-toggled";
const CLASS_SIDEBAR = "sidebar";
const CLASS_TOGGLED = "toggled";

export class MenuTherapistController {

    public static initView(): void {
        this.renderIcon();
    }

    private static renderIcon() {

        const appConfig: AppConfigTherapist = ModelTherapist.appConfigTherapist;
        const logo: string = "../resrc/img/" + appConfig.logo;

        document.getElementById(ID_LOGO).setAttribute("src", logo);
    }

    public static registerUserEvents(): void {
        MenuTherapistController.registerToggleSideNavigation();
    }

    private static registerToggleSideNavigation(): void {

        const selector: string = "#" + ID_SIDEBAR_TOGGLE + ", #" + ID_SIDEBAR_TOGGLE_TOP + "";
        let sidebar: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(selector)

        sidebar.forEach(function (element) {
            element.addEventListener("click", function (event) {
                document.body.classList.toggle(CLASS_SIDEBAR_TOGGLED);
                document.querySelectorAll("." + CLASS_SIDEBAR).forEach(function (element) {
                    element.classList.toggle(CLASS_TOGGLED);
                });
                if (document.querySelector(".sidebar").classList.contains("toggled")) {
                    document.querySelector(".sidebar .collapse").classList.remove("show");
                }
            });
        });

    }

}