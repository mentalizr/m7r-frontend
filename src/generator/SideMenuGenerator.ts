import {Program, Submodule} from "../patient/general/entities/Program";

export class SideMenuGenerator {

    public static generate(program: Program): string {

        let html: string = "";
        for (let module of program.modules) {
            html += "<li class=\"nav-item\">\n";
            const id: string = module.id;
            if (module.accessible) {
                html += "    <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseModule_"
                    + id + "\" aria-expanded=\"true\" aria-controls=\"collapseModule_" + id + "\">\n";
            } else {
                html += "    <a class=\"nav-link collapsed m7r-sidemenu-item-deactivated\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseModule_"
                    + id + "\" aria-expanded=\"true\" aria-controls=\"collapseModule_" + id + "\">\n";
            }
            html += "        <i class=\"fas fa-fw fa-book-reader\"></i>\n";
            html += "        <span>" + module.name + "</span>\n";
            html += "    </a>\n";
            html += "    <div id=\"collapseModule_" + id + "\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\n";
            html += "        <div class=\"bg-white py-2 collapse-inner rounded\">\n";
            html += "            <h6 class=\"collapse-header\">Modul:</h6>\n";
            html += this.generateSubmodules(module.submodules);
            html += "        </div>\n";
            html += "    </div>\n";
            html += "</li>\n"
        }
        return html;
    }

    private static generateSubmodules(submodules: Submodule[]): string {
        let html: string = "";
        for (let submodule of submodules) {
            if (submodule.accessible) {
                html += "            <a id=\"link-submodule-" + submodule.id + "\" class=\"collapse-item\">" + submodule.name + "</a>\n";
            } else {
                html += "            <a id=\"link-submodule-" + submodule.id + "\" class=\"collapse-item m7r-sidemenu-subitem-deactivated\">" + submodule.name + "</a>\n";
            }

        }
        return html;
    }

}