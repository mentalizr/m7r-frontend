import {it} from "mocha";
import {assert} from "chai";
import {ProgramNamedScopeElements} from "../../src/patient/content/mainContent/model/InputElementsRegistry/ProgramNamedScopeElements";
import {Input} from "../../src/patient/content/mainContent/model/InputElementsRegistry/Input";
import {AbstractInputElement} from "../../src/patient/content/mainContent/model/InputElementsRegistry/AbstractInputElement";

describe("RefIdElements", () => {

    let refIdElements: ProgramNamedScopeElements;

    beforeEach(() => {
        refIdElements = new ProgramNamedScopeElements();
    });

    it("initialized object is empty", () => {
        assert(refIdElements.getScopeIdsAsSet().size == 0, "Size of refIdSet ist zero.");
    });

    it("one element", () => {
        const input = new Input("myId");
        refIdElements.addElementToProgramScope(input, "myRefId");
        refIdElements.debugOut();

        let refIdsSet: Set<string> = refIdElements.getScopeIdsAsSet();
        assert(refIdsSet.size == 1);
        assert(refIdsSet.has("myRefId"));

        let elements: Set<AbstractInputElement> = refIdElements.getElementsForScopeId("myRefId");
        assert(elements.size == 1);
        assert(elements.has(input));
    });

    it("multiple elements for same refId", () => {

        const input1 = new Input("myId1");
        const input2 = new Input("myId2");
        const input3 = new Input("myId3");

        refIdElements.addElementToProgramScope(input1, "myRefId");
        refIdElements.addElementToProgramScope(input2, "myRefId");
        refIdElements.addElementToProgramScope(input3, "myRefId");
        refIdElements.debugOut();

        let refIdsSet: Set<string> = refIdElements.getScopeIdsAsSet();
        assert(refIdsSet.size == 1);
        assert(refIdsSet.has("myRefId"));

        let elements: Set<AbstractInputElement> = refIdElements.getElementsForScopeId("myRefId");
        assert(elements.has(input1));
        assert(elements.has(input2));
        assert(elements.has(input3));
    });

    it("multiple elements for multiple refIds", () => {

        const input1_scope1 = new Input("myId1_scope1");
        const input2_scope1 = new Input("myId2_scope1");
        const input1_scope2 = new Input("myId1_scope2");
        const input2_scope2 = new Input("myId2_scope2");
        const input1_scope3 = new Input("myId1_scope3");

        refIdElements.addElementToProgramScope(input1_scope1, "myRefId1");
        refIdElements.addElementToProgramScope(input2_scope1, "myRefId1");
        refIdElements.addElementToProgramScope(input1_scope2, "myRefId2");
        refIdElements.addElementToProgramScope(input2_scope2, "myRefId2");
        refIdElements.addElementToProgramScope(input1_scope3, "myRefId3");
        refIdElements.debugOut();

        let refIdsSet: Set<string> = refIdElements.getScopeIdsAsSet();
        assert(refIdsSet.size == 3);
        assert(refIdsSet.has("myRefId1"));
        assert(refIdsSet.has("myRefId2"));
        assert(refIdsSet.has("myRefId3"));

        let elements: Set<AbstractInputElement> = refIdElements.getElementsForScopeId("myRefId1");
        assert(elements.has(input1_scope1));
        assert(elements.has(input2_scope1));

        elements = refIdElements.getElementsForScopeId("myRefId2");
        assert(elements.has(input1_scope2));
        assert(elements.has(input2_scope2));

        elements = refIdElements.getElementsForScopeId("myRefId3");
        assert(elements.has(input1_scope3));

    });

})