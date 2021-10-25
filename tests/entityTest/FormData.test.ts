import {it} from "mocha";
import {assert} from "chai";
import {FormData} from "../../src/patient/content/mainContent/model/formData/FormData";

describe("FormData", () => {

    it("simple", () => {
        const formData: FormData
            = JSON.parse("{\n" +
            "  \"userId\": \"userId\",\n" +
            "  \"contentId\": \"contentId\",\n" +
            "  \"formElementDataList\": [\n" +
            "    {\n" +
            "      \"formElementId\": \"elementId\",\n" +
            "      \"formElementType\": \"elementType\",\n" +
            "      \"formElementValue\": \"elementValue\"\n" +
            "    }\n" +
            "  ]\n" +
            "}");

        assert.equal(formData.userId, "userId", "userId");
        assert.equal(formData.contentId, "contentId", "contentId")
        assert.isNotOk(formData.exercise);
        assert.isOk(formData.formElementDataList);
        assert.equal(formData.formElementDataList.length, 1);
        assert.equal(formData.formElementDataList[0].formElementId, "elementId");
        assert.equal(formData.formElementDataList[0].formElementType, "elementType");
        assert.equal(formData.formElementDataList[0].formElementValue, "elementValue");

    });

    it("exercise", () => {
        const formData: FormData
            = JSON.parse("{\n" +
            "  \"userId\": \"userId\",\n" +
            "  \"contentId\": \"contentId\",\n" +
            "  \"exercise\": {\n" +
            "    \"sent\": true,\n" +
            "    \"lastModifiedTimestamp\": \"lastModifiedTimestamp\",\n" +
            "    \"seenByTherapist\": true,\n" +
            "    \"seenByTherapistTimestamp\": \"seenByTherapistTimestamp\"\n" +
            "  },\n" +
            "  \"formElementDataList\": [\n" +
            "    {\n" +
            "      \"formElementId\": \"elementId\",\n" +
            "      \"formElementType\": \"elementType\",\n" +
            "      \"formElementValue\": \"elementValue\"\n" +
            "    }\n" +
            "  ]\n" +
            "}");

        assert.isOk(formData.exercise);
        assert.isTrue(formData.exercise.sent);
        assert.equal(formData.exercise.lastModifiedTimestamp, "lastModifiedTimestamp");
        assert.isTrue(formData.exercise.seenByTherapist);
        assert.equal(formData.exercise.seenByTherapistTimestamp, "seenByTherapistTimestamp");
    });

    it("feedback", () => {
        const formData: FormData
            = JSON.parse("{\n" +
            "  \"userId\": \"userId\",\n" +
            "  \"contentId\": \"contentId\",\n" +
            "  \"exercise\": {\n" +
            "    \"sent\": true,\n" +
            "    \"lastModifiedTimestamp\": \"lastModifiedTimestamp\",\n" +
            "    \"seenByTherapist\": true,\n" +
            "    \"seenByTherapistTimestamp\": \"seenByTherapistTimestamp\"\n" +
            "  },\n" +
            "  \"formElementDataList\": [\n" +
            "    {\n" +
            "      \"formElementId\": \"elementId\",\n" +
            "      \"formElementType\": \"elementType\",\n" +
            "      \"formElementValue\": \"elementValue\"\n" +
            "    }\n" +
            "  ],\n" +
            "  \"feedback\": {\n" +
            "    \"text\": \"text\",\n" +
            "    \"createdTimestamp\": \"createdTimestamp\",\n" +
            "    \"therapistId\": \"therapistId\",\n" +
            "    \"seenByPatient\": true,\n" +
            "    \"seenByPatientTimestamp\": \"seenByPatientTimestamp\"\n" +
            "  }\n" +
            "}");

        assert.isOk(formData.feedback);
        assert.equal(formData.feedback.text, "text");
        assert.equal(formData.feedback.createdTimestamp, "createdTimestamp");
        assert.equal(formData.feedback.therapistId, "therapistId");
        assert.isTrue(formData.feedback.seenByPatient);
        assert.equal(formData.feedback.seenByPatientTimestamp, "seenByPatientTimestamp");
    });

})
