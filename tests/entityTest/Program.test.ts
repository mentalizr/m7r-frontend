import {it} from "mocha";
import {assert} from "chai";
import {Program} from "../../src/patient/general/entities/Program";

describe("Program", () => {

    it("program", () => {
        const program: Program = JSON.parse("{\n" +
            "    \"blocking\": false,\n" +
            "    \"id\": \"test\",\n" +
            "    \"infotexts\": [\n" +
            "        {\n" +
            "            \"id\": \"test__info_1\",\n" +
            "            \"name\": \"Dummyinfotext1\"\n" +
            "        },\n" +
            "        {\n" +
            "            \"id\": \"test__info_10\",\n" +
            "            \"name\": \"Infoseite Test1\"\n" +
            "        },\n" +
            "        {\n" +
            "            \"id\": \"test__info_11\",\n" +
            "            \"name\": \"Zweite Infoseite-Test\"\n" +
            "        },\n" +
            "        {\n" +
            "            \"id\": \"test__info_2\",\n" +
            "            \"name\": \"Dummyinfotext2\"\n" +
            "        }\n" +
            "    ],\n" +
            "    \"modules\": [\n" +
            "        {\n" +
            "            \"id\": \"test_m1\",\n" +
            "            \"name\": \"Eingabefelder\",\n" +
            "            \"submodules\": [\n" +
            "                {\n" +
            "                    \"id\": \"test_m1_sm1\",\n" +
            "                    \"name\": \"page scope\",\n" +
            "                    \"steps\": [\n" +
            "                        {\n" +
            "                            \"id\": \"test_m1_sm1_s1\",\n" +
            "                            \"name\": \"Schritt 1\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"id\": \"test_m1_sm1_s2\",\n" +
            "                            \"name\": \"Schritt 2\"\n" +
            "                        }\n" +
            "                    ]\n" +
            "                },\n" +
            "                {\n" +
            "                    \"id\": \"test_m1_sm2\",\n" +
            "                    \"name\": \"generic program scope\",\n" +
            "                    \"steps\": [\n" +
            "                        {\n" +
            "                            \"id\": \"test_m1_sm2_s1\",\n" +
            "                            \"name\": \"Schritt 1\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"id\": \"test_m1_sm2_s2\",\n" +
            "                            \"name\": \"Schritt 2\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"id\": \"test_m1_sm2_s3\",\n" +
            "                            \"name\": \"Schritt 3\"\n" +
            "                        }\n" +
            "                    ]\n" +
            "                },\n" +
            "                {\n" +
            "                    \"id\": \"test_m1_sm3\",\n" +
            "                    \"name\": \"program scope\",\n" +
            "                    \"steps\": [\n" +
            "                        {\n" +
            "                            \"id\": \"test_m1_sm3_s1\",\n" +
            "                            \"name\": \"Schritt 1\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"id\": \"test_m1_sm3_s2\",\n" +
            "                            \"name\": \"Schritt 2\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"id\": \"test_m1_sm3_s3\",\n" +
            "                            \"name\": \"Schritt 3\"\n" +
            "                        }\n" +
            "                    ]\n" +
            "                },\n" +
            "                {\n" +
            "                    \"id\": \"test_m1_sm4\",\n" +
            "                    \"name\": \"program scope inc\",\n" +
            "                    \"steps\": [\n" +
            "                        {\n" +
            "                            \"id\": \"test_m1_sm4_s1\",\n" +
            "                            \"name\": \"Schritt 1\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"id\": \"test_m1_sm4_s2\",\n" +
            "                            \"name\": \"Schritt 2\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"id\": \"test_m1_sm4_s3\",\n" +
            "                            \"name\": \"Schritt 3\"\n" +
            "                        }\n" +
            "                    ]\n" +
            "                }\n" +
            "            ]\n" +
            "        },\n" +
            "        {\n" +
            "            \"id\": \"test_m2\",\n" +
            "            \"name\": \"Dummy\",\n" +
            "            \"submodules\": [\n" +
            "                {\n" +
            "                    \"id\": \"test_m2_sm1\",\n" +
            "                    \"name\": \"Erstes Submodul\",\n" +
            "                    \"steps\": [\n" +
            "                        {\n" +
            "                            \"id\": \"test_m2_sm1_s1\",\n" +
            "                            \"name\": \"Schritt 1\"\n" +
            "                        }\n" +
            "                    ]\n" +
            "                },\n" +
            "                {\n" +
            "                    \"id\": \"test_m2_sm2\",\n" +
            "                    \"name\": \"Zweites Submodul\",\n" +
            "                    \"steps\": [\n" +
            "                        {\n" +
            "                            \"id\": \"test_m2_sm2_s1\",\n" +
            "                            \"name\": \"Schritt 1\"\n" +
            "                        }\n" +
            "                    ]\n" +
            "                }\n" +
            "            ]\n" +
            "        }\n" +
            "    ],\n" +
            "    \"name\": \"Test\"\n" +
            "}");


        assert.equal(program.id, "test", "id");
        assert.equal(program.name, "Test", "name");
        assert.isFalse(program.blocking, "blocking");

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

        assert.equal(program.modules[0].submodules.length, 4, "number of submodules of first module");

        assert.equal(program.modules[0].submodules[0].id, "test_m1_sm1");
        assert.equal(program.modules[0].submodules[0].name, "page scope");
        assert.equal(program.modules[0].submodules[0].steps.length, 2);
        assert.equal(program.modules[0].submodules[0].steps[0].id, "test_m1_sm1_s1");
        assert.equal(program.modules[0].submodules[0].steps[0].name, "Schritt 1");

    });

})
