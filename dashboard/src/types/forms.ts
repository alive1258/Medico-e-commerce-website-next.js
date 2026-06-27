import type { FieldErrors } from "react-hook-form";

export interface IBaseInputProps {
    label?: string;
    name: string;
    type?: string;
    placeholder?: string;
    register?: any;
    errors?: FieldErrors<Record<string, any>>;
    value?: string | number;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    required?: boolean;
    disable_content?: React.ReactNode;
    customRef?: React.Ref<HTMLInputElement>;
}

export interface ISearchSelectProps<T, P> {
    label?: string;
    placeholder?: string;
    fetchHook: (params: P) => { data?: T[]; isLoading: boolean; refetch: () => void };
    fetchParams: P;
    renderOption: (item: T) => React.ReactNode;
    onSelect?: (item: T) => void;
    pageSize?: number;
}


export interface ISelectOption {
    id?: string | number;
    name: string;
    number?: string | number;
    balance?: number;
    [key: string]: any; // Allow additional properties
}

export interface ISelectAndSearchProps {
    options: ISelectOption[];
    type_id: string;
    type_name: string;
    setValue: (name: string, value: any) => void;
    required?: boolean;
    register: (name: string, options?: any) => any;
    message?: string;
    errors?: Record<string, any> | null;
    placeholder?: string;
    setSelectedOption?: (option: ISelectOption | null) => void;
    selectStatus?: boolean;
    position?: "up" | "down";
    label?: string;
    label_color?: string;
    setBalance?: (balance: number | undefined) => void;
    handleSelect?: (option: ISelectOption) => void;
}


export interface RadioOption {
    value: any;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    isLearnMore?: boolean;
    handleLearnMore?: () => void;
}

export interface IInputRadio {
    name: string;
    options: RadioOption[];
    label?: string;
    required?: boolean;
    error?: string;
    layout?: 'vertical' | 'horizontal';
    control?: any ;
    className?: string
}


export interface IInputToggleProps {
    label: string;
    text: string;
    control: any;
    errors: any;
    required?: boolean;
    readOnly?: boolean;
    color?: string;
    noBorder?: boolean;
}

export interface IInputCheckbox {
    name: string;
    label: string;
    description?: string;
    control: any;
    errors?: any;
    disabled?: boolean;
    required?: boolean;
}