import {Model} from "../model/Model";
import * as Mustache from "mustache";
import {AppController} from "./AppController";
import {AppConfig} from "../../appFrame/model/AppConfig";
import {AppConfigFetch} from "../fetch/AppConfigFetch";
import {
    ID_LOGO,
    ID_SIDEBAR_COMMUNICATION_DIVIDER,
    ID_SIDEBAR_COMMUNICATION_HEADING, ID_SIDEBAR_COMMUNICATION_MESSAGES,
    ID_SIDEBAR_COMMUNICATION_QUESTIONING,
    ID_SIDEBAR_COMMUNICATION_VIDEOCONFERENCE,
    ID_SIDEBAR_DIARIES_ACTIVITIES,
    ID_SIDEBAR_DIARIES_DIVIDER,
    ID_SIDEBAR_DIARIES_HEADING,
    ID_SIDEBAR_DIARIES_MOOD
} from "../../../Globals";

const ID_MENU_ITEM_TEMPLATE = "menu-item-template";
const ID_MENU_ITEM_LIST = "menu-item-list";
const ID_SIDEBAR_TOGGLE = "sidebarToggle";
const ID_SIDEBAR_TOGGLE_TOP = "sidebarToggleTop";
const ID_PROGRAM_NAME_HEADING = "program-name-heading";

const CLASS_SUBMODULE = "collapse-item";
const CLASS_SIDEBAR_TOGGLED = "sidebar-toggled";
const CLASS_SIDEBAR = "sidebar";
const CLASS_TOGGLED = "toggled";

export class MenuController {

    public static initView(): void {
        this.renderIcon();
        // TODO renderProgram
        this.renderMenu();
        this.renderProgramName();
        this.renderDiaries();
        this.renderCommunication();
    }

    private static renderIcon() {

        const appConfig: AppConfig = Model.appConfig;
        const logo: string = "../resrc/img/" + appConfig.logo;

        document.getElementById(ID_LOGO).setAttribute("src", logo);
    }

    private static renderMenu() {
        const template = document.getElementById(ID_MENU_ITEM_TEMPLATE).innerHTML;
        const rendered: string = Mustache.render(template, Model.program);
        document.getElementById(ID_MENU_ITEM_LIST).innerHTML = rendered;
    }

    private static renderProgramName() {
        const template = document.getElementById(ID_PROGRAM_NAME_HEADING).innerHTML;
        const rendered = Mustache.render(template, Model.program);
        document.getElementById(ID_PROGRAM_NAME_HEADING).innerHTML = rendered;
    }

    public static registerUserEvents(): void {

        MenuController.submoduleClicked();
        MenuController.registerToggleSideNavigation();
    }

    private static submoduleClicked(): void {

        let submodules: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>("." + CLASS_SUBMODULE);

        submodules.forEach(function (element) {
            element.addEventListener("click", function (event) {
                event.preventDefault();

                const submodule_id = this.id.substring(15);

                // console.log("Menu Item clicked: " + this.id + " submoduleId: " + submodule_id);

                MenuController.actionSubmoduleSelected(submodule_id);
            });
        })
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

    public static renderDiaries(): void {

        const appConfig: AppConfig = Model.appConfig;
        const hasDiaries: boolean = (appConfig.activityDiary || appConfig.moodDiary);

        if (hasDiaries) {
            this.showElement(ID_SIDEBAR_DIARIES_DIVIDER);
            this.showElement(ID_SIDEBAR_DIARIES_HEADING);

            if (appConfig.activityDiary) {
                this.showElement(ID_SIDEBAR_DIARIES_ACTIVITIES);
            }

            if (appConfig.moodDiary) {
                this.showElement(ID_SIDEBAR_DIARIES_MOOD);
            }
        }
    }

    public static renderCommunication(): void {

        const appConfig: AppConfig = Model.appConfig;
        const hasCommunicationItems: boolean = (appConfig.questioning || appConfig.videoConference || appConfig.messages);

        if (hasCommunicationItems) {
            this.showElement(ID_SIDEBAR_COMMUNICATION_DIVIDER);
            this.showElement(ID_SIDEBAR_COMMUNICATION_HEADING);

            if (appConfig.questioning) {
                this.showElement(ID_SIDEBAR_COMMUNICATION_QUESTIONING);
            }

            if (appConfig.videoConference) {
                this.showElement(ID_SIDEBAR_COMMUNICATION_VIDEOCONFERENCE);
            }

            if (appConfig.messages) {
                this.showElement(ID_SIDEBAR_COMMUNICATION_MESSAGES);
            }
        }
    }

    private static showElement(id: string): void {
        document.getElementById(id).classList.remove("d-none");
    }

    private static actionSubmoduleSelected(submoduleId: string): void {
        const stepId = Model.getFirstStepId(submoduleId);
        Model.updateStatus(stepId);
        AppController.stepUpdate();
    }

}