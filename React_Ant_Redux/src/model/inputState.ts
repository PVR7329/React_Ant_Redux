export interface inputField {
    type?:string,
    name?:string,
    label?:string|any,
    inputref?:React.LegacyRef<HTMLInputElement> | undefined,
    values?:string,
    errors?:string,
    touched?:string|any,
    placeholder?:string|any,
    onBlur?:React.FocusEventHandler<HTMLInputElement> | undefined,
    onKeyUp?:React.KeyboardEventHandler<HTMLInputElement> | undefined,
    onChange?:React.ChangeEventHandler<HTMLInputElement> | undefined,
}
export interface textariaField {
    name?:string,
    label?:string|any,
    values?:string,
    errors?:string,
    touched?:string|any,
    placeholder?:string|any,
    onBlur?:React.FocusEventHandler<HTMLTextAreaElement> | undefined,
    onKeyUp?:React.KeyboardEventHandler<HTMLTextAreaElement> | undefined,
    onChange?:React.ChangeEventHandler<HTMLTextAreaElement> | undefined,
}
export interface selectField {
    name?:string,
    label?:string|any,
    values?:string,
    errors?:string,
    touched?:string|any,
    placeholder?:string|any,
    onBlur?:React.FocusEventHandler<HTMLSelectElement> | undefined,
    // onKeyUp?:React.KeyboardEventHandler<HTMLSelectElement> | undefined,
    onChange?:React.ChangeEventHandler<HTMLSelectElement> | undefined,
}