import {it} from "mocha";
import {assert} from "chai";
import {Program} from "../../src/patient/general/entities/Program";
import {SideMenuGenerator} from "../../src/generator/SideMenuGenerator";
import {ProgramEntity} from "../entity/ProgramEntity";

describe("Program", () => {

    it("program", () => {
        const program: Program = ProgramEntity.get();

        const htmlExpected: string = "<li class=\"nav-item\">\n" +
            "    <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseModule_test_m1\" aria-expanded=\"true\" aria-controls=\"collapseModule_test_m1\">\n" +
            "        <i class=\"fas fa-fw fa-book-reader\"></i>\n" +
            "        <span>Eingabefelder</span>\n" +
            "    </a>\n" +
            "    <div id=\"collapseModule_test_m1\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\n" +
            "        <div class=\"bg-white py-2 collapse-inner rounded\">\n" +
            "            <h6 class=\"collapse-header\">Modul:</h6>\n" +
            "            <a id=\"link-submodule-test_m1_sm1\" class=\"collapse-item\">page scope</a>\n" +
            "            <a id=\"link-submodule-test_m1_sm2\" class=\"collapse-item\">generic program scope</a>\n" +
            "            <a id=\"link-submodule-test_m1_sm3\" class=\"collapse-item\">program scope</a>\n" +
            "            <a id=\"link-submodule-test_m1_sm4\" class=\"collapse-item\">program scope inc</a>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</li>\n" +
            "<li class=\"nav-item\">\n" +
            "    <a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapseModule_test_m2\" aria-expanded=\"true\" aria-controls=\"collapseModule_test_m2\">\n" +
            "        <i class=\"fas fa-fw fa-book-reader\"></i>\n" +
            "        <span>Dummy</span>\n" +
            "    </a>\n" +
            "    <div id=\"collapseModule_test_m2\" class=\"collapse\" aria-labelledby=\"headingUtilities\" data-parent=\"#accordionSidebar\">\n" +
            "        <div class=\"bg-white py-2 collapse-inner rounded\">\n" +
            "            <h6 class=\"collapse-header\">Modul:</h6>\n" +
            "            <a id=\"link-submodule-test_m2_sm1\" class=\"collapse-item\">Erstes Submodul</a>\n" +
            "            <a id=\"link-submodule-test_m2_sm2\" class=\"collapse-item m7r-sidemenu-subitem-deactivated\">Zweites Submodul</a>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</li>\n";

        const renderedGenerator: string = SideMenuGenerator.generate(program);

        assert.equal(htmlExpected, renderedGenerator, "plausibility");
    });

})
