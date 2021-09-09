import {it} from "mocha";
import {assert} from "chai";
import {Program} from "../../src/patient/general/entities/Program";
import {AppConfigPatient} from "../../src/patient/appFrame/model/AppConfigPatient";

describe("ApplicationConfigPatient", () => {

    it("ApplicationConfigPatient", () => {
        const applicationConfigPatient: AppConfigPatient = JSON.parse("{\n" +
            "    \"logo\": \"logo.png\",\n" +
            "    \"name\": \"brand\",\n" +
            "    \"activityDiary\": true,\n" +
            "    \"messages\": true,\n" +
            "    \"moodDiary\": true,\n" +
            "    \"program\": true,\n" +
            "    \"questioning\": true,\n" +
            "    \"therapist\": true,\n" +
            "    \"videoConference\": true\n" +
            "}");

        assert.equal(applicationConfigPatient.logo, "logo.png", "logo");
        assert.equal(applicationConfigPatient.name, "brand", "name");
        assert.isTrue(applicationConfigPatient.activityDiary);
        assert.isTrue(applicationConfigPatient.messages);
        assert.isTrue(applicationConfigPatient.moodDiary);
        assert.isTrue(applicationConfigPatient.program);
        assert.isTrue(applicationConfigPatient.questioning);
        assert.isTrue(applicationConfigPatient.questioning);
        assert.isTrue(applicationConfigPatient.therapist);
        assert.isTrue(applicationConfigPatient.videoConference);
    });

})
