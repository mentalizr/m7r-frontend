import {it} from "mocha";
import {assert} from "chai";
import {Program} from "../../src/patient/general/entities/Program";
import {ProgramEntity} from "../entity/ProgramEntity";

describe("Program", () => {

    it("program", () => {
        const program: Program = ProgramEntity.get();

        assert.equal(program.id, "test", "id");
        assert.equal(program.name, "Test", "name");
        assert.isTrue(program.blocking, "blocking");

        assert.equal(program.infotexts.length, 4, "number of infotexts");

        assert.equal(program.infotexts[0].id, "test__info_1", "id");
        assert.equal(program.infotexts[0].name, "Dummyinfotext1", "name");

        assert.equal(program.infotexts[1].id, "test__info_10", "id");
        assert.equal(program.infotexts[1].name, "Infoseite Test1", "name");

        assert.equal(program.infotexts[2].id, "test__info_11", "id");
        assert.equal(program.infotexts[2].name, "Zweite Infoseite-Test", "name");

        assert.equal(program.infotexts[3].id, "test__info_2", "id");
        assert.equal(program.infotexts[3].name, "Dummyinfotext2", "name");

        assert.equal(program.modules.length, 2, "number of modules");

        assert.equal(program.modules[0].id, "test_m1", "id of first module");
        assert.equal(program.modules[0].name, "Eingabefelder", "name of first module");
        assert.isTrue(program.modules[0].accessible);

        assert.equal(program.modules[0].submodules.length, 4, "number of submodules of first module");

        assert.equal(program.modules[0].submodules[0].id, "test_m1_sm1");
        assert.equal(program.modules[0].submodules[0].name, "page scope");
        assert.isTrue(program.modules[0].submodules[0].accessible);
        assert.equal(program.modules[0].submodules[0].steps.length, 2);
        assert.equal(program.modules[0].submodules[0].steps[0].id, "test_m1_sm1_s1");
        assert.equal(program.modules[0].submodules[0].steps[0].name, "Schritt 1");
        assert.isTrue(program.modules[0].submodules[0].steps[0].accessible);

        assert.isTrue(program.modules[1].accessible);
        assert.isTrue(program.modules[1].submodules[0].accessible);
        assert.isTrue(program.modules[1].submodules[0].steps[0].accessible);
        assert.isFalse(program.modules[1].submodules[0].steps[1].accessible);
    });

})
