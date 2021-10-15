// noinspection DuplicatedCode

import {it} from "mocha";
import {assert} from "chai";
import {Program} from "../../../../src/patient/general/entities/Program";
import {ProgramEntity} from "../../../entity/ProgramEntity";
import {ProgramModel} from "../../../../src/patient/general/model/ProgramModel";

describe("ProgramStepper", () => {

    it("program", () => {
        const program: Program = ProgramEntity.get();

        const programStepper: ProgramModel = new ProgramModel(program);

        assert.equal(programStepper.getCurrentStepId(), "test_m1_sm1_s1");
        assert.isFalse(programStepper.isLastStep());
        assert.isTrue(programStepper.hasNextStep());
        assert.isFalse(programStepper.hasPreviousStep());
        assert.isTrue(programStepper.hasAccessibleNextStep());
        assert.isFalse(programStepper.isCurrentStepFeedback());
        assert.isFalse(programStepper.isCurrentStepExercise());

        programStepper.stepForward();
        assert.equal(programStepper.getCurrentStepId(), "test_m1_sm1_s2");
        assert.isFalse(programStepper.isLastStep());
        assert.isTrue(programStepper.hasNextStep());
        assert.isTrue(programStepper.hasPreviousStep());
        assert.isTrue(programStepper.hasAccessibleNextStep());
        assert.isFalse(programStepper.isCurrentStepFeedback());
        assert.isFalse(programStepper.isCurrentStepExercise());

        programStepper.stepForward();
        assert.equal(programStepper.getCurrentStepId(), "test_m1_sm2_s1");
        assert.isFalse(programStepper.isLastStep());
        assert.isTrue(programStepper.hasNextStep());
        assert.isTrue(programStepper.hasPreviousStep());
        assert.isTrue(programStepper.hasAccessibleNextStep());
        assert.isFalse(programStepper.isCurrentStepFeedback());
        assert.isFalse(programStepper.isCurrentStepExercise());

        programStepper.stepForward();
        assert.equal(programStepper.getCurrentStepId(), "test_m1_sm2_s2");
        assert.isFalse(programStepper.isLastStep());
        assert.isTrue(programStepper.hasNextStep());
        assert.isTrue(programStepper.hasPreviousStep());
        assert.isTrue(programStepper.hasAccessibleNextStep());
        assert.isFalse(programStepper.isCurrentStepFeedback());
        assert.isFalse(programStepper.isCurrentStepExercise());

        programStepper.stepForward();
        assert.equal(programStepper.getCurrentStepId(), "test_m1_sm2_s3");
        assert.isFalse(programStepper.isLastStep());
        assert.isTrue(programStepper.hasNextStep());
        assert.isTrue(programStepper.hasPreviousStep());
        assert.isTrue(programStepper.hasAccessibleNextStep());
        assert.isFalse(programStepper.isCurrentStepFeedback());
        assert.isFalse(programStepper.isCurrentStepExercise());

        programStepper.stepForward();
        assert.equal(programStepper.getCurrentStepId(), "test_m1_sm3_s1");

        programStepper.stepForward();
        assert.equal(programStepper.getCurrentStepId(), "test_m1_sm3_s2");

        programStepper.stepForward();
        assert.equal(programStepper.getCurrentStepId(), "test_m1_sm3_s3");

        programStepper.stepForward();
        assert.equal(programStepper.getCurrentStepId(), "test_m1_sm4_s1");

        programStepper.stepForward();
        assert.equal(programStepper.getCurrentStepId(), "test_m1_sm4_s2");

        programStepper.stepForward();
        assert.equal(programStepper.getCurrentStepId(), "test_m1_sm4_s3");

        programStepper.stepForward();
        assert.equal(programStepper.getCurrentStepId(), "test_m2_sm1_s1");
        assert.isFalse(programStepper.isLastStep());
        assert.isTrue(programStepper.hasNextStep());
        assert.isTrue(programStepper.hasPreviousStep());
        assert.isFalse(programStepper.hasAccessibleNextStep()); // !
        assert.isFalse(programStepper.isCurrentStepFeedback());
        assert.isTrue(programStepper.isCurrentStepExercise()); // !

        programStepper.stepBackwards();
        assert.equal(programStepper.getCurrentStepId(), "test_m1_sm4_s3");

    });

});