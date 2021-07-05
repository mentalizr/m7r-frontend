export interface FormElementDataList {
    formElementType: string;    // input | radio
    formElementId: string;
    formElementValue: string;
}

export interface FormData {
    userId: string;
    contentId: string;
    editable: boolean;
    formElementDataList: FormElementDataList[];
}