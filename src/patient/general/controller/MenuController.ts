import {Model} from "../model/Model";
import * as Mustache from "mustache";
import {AppConfigPatient} from "../../appFrame/model/AppConfigPatient";
import {
    ID_LOGO,
    ID_SIDEBAR_COMMUNICATION_DIVIDER,
    ID_SIDEBAR_COMMUNICATION_HEADING,
    ID_SIDEBAR_COMMUNICATION_MESSAGES,
    ID_SIDEBAR_COMMUNICATION_QUESTIONING,
    ID_SIDEBAR_COMMUNICATION_VIDEOCONFERENCE,
    ID_SIDEBAR_DIARIES_ACTIVITIES,
    ID_SIDEBAR_DIARIES_DIVIDER,
    ID_SIDEBAR_DIARIES_HEADING,
    ID_SIDEBAR_DIARIES_MOOD
} from "../../../Globals";
import {PatientAppController} from "./PatientAppController";
import {SideMenuGenerator} from "../../../generator/SideMenuGenerator";

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

        const appConfig: AppConfigPatient = Model.appConfigPatient;
        const logo: string = "../resrc/img/" + appConfig.logo;

        document.getElementById(ID_LOGO).setAttribute("src", logo);
    }

    public static renderMenu() {
        document.getElementById(ID_MENU_ITEM_LIST).innerHTML
            = SideMenuGenerator.generate(Model.getProgramModel().getProgram());
    }

    private static renderProgramName() {
        const template = document.getElementById(ID_PROGRAM_NAME_HEADING).innerHTML;
        const rendered = Mustache.render(template, Model.getProgramModel().getProgram());
        document.getElementById(ID_PROGRAM_NAME_HEADING).innerHTML = rendered;
    }

    public static registerUserEvents(): void {

        MenuController.registerMenuClicks();
        MenuController.registerToggleSideNavigation();
    }

    public static registerMenuClicks(): void {
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
        const appConfig: AppConfigPatient = Model.appConfigPatient;
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
        const appConfig: AppConfigPatient = Model.appConfigPatient;
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
        const stepId = Model.getProgramModel().getFirstStepIdOfSubmodule(submoduleId);
        Model.getProgramModel().gotoStep(stepId);
        PatientAppController.stepUpdate();
    }

}