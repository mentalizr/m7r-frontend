import {InputElementsRegistry} from "./InputElementsRegistry";
import {FormDataSelector} from "../../formDataPersist/FormDataSelector";
import {Input} from "./Input";
import {Textarea} from "./Textarea";
import {RadioGroup} from "./RadioGroup";
import {CSS_ATTRIBUTE_PROGRAM_SCOPE_ID, CSS_ATTRIBUTE_VALUE__PROGRAM_SCOPE_ID__GENERIC} from "../../../../../Globals";

export class InputElementsRegistryFactory {

    public static getInstance(contentHtml: string): InputElementsRegistry {

        let content: HTMLElement = document.createElement("div");
        content.innerHTML = contentHtml;

        return InputElementsRegistryFactory.initialize(content);
    }

    private static initialize(content: HTMLElement): InputElementsRegistry {

        let inputElementsRegistry: InputElementsRegistry = new InputElementsRegistry();

        InputElementsRegistryFactory.initializePageScope(content, inputElementsRegistry);
        InputElementsRegistryFactory.initializeProgramGenericScope(content, inputElementsRegistry);
        InputElementsRegistryFactory.initializeProgramScopes(content, inputElementsRegistry);

        return inputElementsRegistry;
    }

    private static initializePageScope(content: HTMLElement, inputElementsRegistry: InputElementsRegistry) {

        const inputHTMLElement: NodeListOf<HTMLElement> = FormDataSelector.getAllInputFieldsInScopePage(content);
        inputHTMLElement.forEach(element => {
            inputElementsRegistry.addElementToPageScope(Input.getInstance(element));
        });

        const textareaHTMLElement: NodeListOf<HTMLElement> = FormDataSelector.getAllTextareasInScopePage(content);
        textareaHTMLElement.forEach(element => {
            inputElementsRegistry.addElementToPageScope(Textarea.getInstance(element));
        });

        const radioGroupHTMLElement: NodeListOf<HTMLElement> = FormDataSelector.getAllRadioButtonGroupsInScopePage(content);
        radioGroupHTMLElement.forEach(element => {
            inputElementsRegistry.addElementToPageScope(RadioGroup.getInstance(element));
        })
    }

    private static initializeProgramGenericScope(content: HTMLElement, inputElementsRegistry: InputElementsRegistry) {

        const inputHTMLElement: NodeListOf<HTMLElement> = FormDataSelector.getAllInputFieldsInProgramGenericScope(content);
        inputHTMLElement.forEach(element => {
            inputElementsRegistry.addElementToProgramGenericScope(Input.getInstance(element));
        });

        const textareaHTMLElement: NodeListOf<HTMLElement> = FormDataSelector.getAllTextareasInProgramGenericScope(content);
        textareaHTMLElement.forEach(element => {
            inputElementsRegistry.addElementToProgramGenericScope(Textarea.getInstance(element));
        });

        const radioGroupHTMLElement: NodeListOf<HTMLElement> = FormDataSelector.getAllRadioButtonGroupsInProgramGenericScope(content);
        radioGroupHTMLElement.forEach(element => {
            inputElementsRegistry.addElementToProgramGenericScope(RadioGroup.getInstance(element));
        })
    }

    private static initializeProgramScopes(content: HTMLElement, inputElementsRegistry: InputElementsRegistry) {

        let programScopes: Set<string> = InputElementsRegistryFactory.obtainDistinctProgramScopes(content);

        // console.log("DEBUG gefundene programScopes: " + programScopes.size);

        for (let scopeId of programScopes) {

            // console.log("DEBUG programScope: " + scopeId);

            const inputHTMLElement: NodeListOf<HTMLElement> = FormDataSelector.getAllInputFieldsInProgramScope(content, scopeId);
            inputHTMLElement.forEach(element => {
                inputElementsRegistry.addElementToProgramNamedScope(Input.getInstance(element), scopeId);
            });

            const textareaHTMLElement: NodeListOf<HTMLElement> = FormDataSelector.getAllTextareasInProgramScope(content, scopeId);
            textareaHTMLElement.forEach(element => {
                inputElementsRegistry.addElementToProgramNamedScope(Textarea.getInstance(element), scopeId);
            });

            const radioGroupHTMLElement: NodeListOf<HTMLElement> = FormDataSelector.getAllRadioButtonGroupsInProgramScope(content, scopeId);
            radioGroupHTMLElement.forEach(element => {
                inputElementsRegistry.addElementToProgramNamedScope(RadioGroup.getInstance(element), scopeId);
            })

        }
    }

    private static obtainDistinctProgramScopes(content: HTMLElement): Set<string> {

        let programScopeIds = new Set<string>();

        const scopedElements: NodeListOf<HTMLElement> = FormDataSelector.getAllElementsInAnyScope(content);
        scopedElements.forEach(element => {
            const scopeId: string = element.getAttribute(CSS_ATTRIBUTE_PROGRAM_SCOPE_ID);
            if (scopeId !== CSS_ATTRIBUTE_VALUE__PROGRAM_SCOPE_ID__GENERIC) {
                programScopeIds.add(scopeId);
            }
        })

        return programScopeIds;
    }

}