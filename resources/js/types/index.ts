export interface Option {
    value: number;
    label: string;
}

export interface FormData {
    teacher: Option | null;
    school_classes: Option[];
    subjects: Option[];
    times: Option[];
    days: Option[];
}

export interface OptionsData {
    teachers: Option[];
    school_classes: Option[];
    subjects: Option[];
    times: Option[];
    days: Option[];
}
