import {
    CSS_ATTRIBUTE_PROGRAM_SCOPE_ID,
    CSS_ATTRIBUTE_VALUE__PROGRAM_SCOPE_ID__GENERIC,
    CSS_CLASS_NS_INPUT,
    CSS_CLASS_NS_RADIOGROUP,
    ID_MAIN_CONTENT
} from "../../../../Globals";

export class FormDataSelector {

    public static getAllInputFields(): NodeListOf<HTMLElement> {
        const selector = "#" + ID_MAIN_CONTENT + " ." + CSS_CLASS_NS_INPUT;
        return document.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllCheckedRadioButtons(): NodeListOf<HTMLElement> {
        const selector = "#" + ID_MAIN_CONTENT + " ." + CSS_CLASS_NS_RADIOGROUP + " input[type='radio']:checked";
        return document.querySelectorAll<HTMLElement>(selector);
    }

    // Neu ...

    public static getAllInputFieldsInScopePage(content: HTMLElement): NodeListOf<HTMLElement> {
        const selector = "input." + CSS_CLASS_NS_INPUT + ":not([" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "])";
        return content.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllInputFieldsInProgramGenericScope(content: HTMLElement): NodeListOf<HTMLElement> {
        const selector = "input." + CSS_CLASS_NS_INPUT + "[" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "=" + CSS_ATTRIBUTE_VALUE__PROGRAM_SCOPE_ID__GENERIC + "]";
        return content.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllInputFieldsInProgramScope(content: HTMLElement, scopeId: string): NodeListOf<HTMLElement> {
        const selector = "input." + CSS_CLASS_NS_INPUT + "[" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "=" + scopeId + "]";
        return content.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllTextareasInScopePage(content: HTMLElement): NodeListOf<HTMLElement> {
        const selector = "textarea." + CSS_CLASS_NS_INPUT + ":not([" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "])";
        return content.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllTextareasInProgramGenericScope(content: HTMLElement): NodeListOf<HTMLElement> {
        const selector = "textarea." + CSS_CLASS_NS_INPUT + "[" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "=" + CSS_ATTRIBUTE_VALUE__PROGRAM_SCOPE_ID__GENERIC + "]";
        return content.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllTextareasInProgramScope(content: HTMLElement, scopeId: string): NodeListOf<HTMLElement> {
        const selector = "textarea." + CSS_CLASS_NS_INPUT + "[" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "=" + scopeId + "]";
        return content.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllRadioButtonGroupsInScopePage(content: HTMLElement): NodeListOf<HTMLElement> {
        const selector = "." + CSS_CLASS_NS_RADIOGROUP + ":not([" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "])";
        return content.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllRadioButtonGroupsInProgramGenericScope(content: HTMLElement): NodeListOf<HTMLElement> {
        const selector = "." + CSS_CLASS_NS_RADIOGROUP + "[" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "=" + CSS_ATTRIBUTE_VALUE__PROGRAM_SCOPE_ID__GENERIC + "]";
        return content.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllRadioButtonGroupsInProgramScope(content: HTMLElement, scopeId: string): NodeListOf<HTMLElement> {
        const selector = "." + CSS_CLASS_NS_RADIOGROUP + "[" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "=" + scopeId + "]";
        return content.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllCheckedRadioButtonsInScopePage(content: HTMLElement): NodeListOf<HTMLElement> {
        const selector = "." + CSS_CLASS_NS_RADIOGROUP + ":not([" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "])" + " input[type='radio']:checked";
        return content.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllCheckedRadioButtonsInProgramGenericScope(content: HTMLElement): NodeListOf<HTMLElement> {
        const selector = "." + CSS_CLASS_NS_RADIOGROUP + "[" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "=" + CSS_ATTRIBUTE_VALUE__PROGRAM_SCOPE_ID__GENERIC + "]" + " input[type='radio']:checked";
        return content.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllCheckedRadioButtonsInProgramScope(content: HTMLElement, scopeId: string): NodeListOf<HTMLElement> {
        const selector = "." + CSS_CLASS_NS_RADIOGROUP + "[" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "=" + scopeId + "]" + " input[type='radio']:checked";
        return content.querySelectorAll<HTMLElement>(selector);
    }

    public static getAllElementsInAnyScope(content: HTMLElement): NodeListOf<HTMLElement> {
        const selector = "[" + CSS_ATTRIBUTE_PROGRAM_SCOPE_ID + "]";
        return content.querySelectorAll<HTMLElement>(selector);
    }


}