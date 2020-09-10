
export const required = value => {
    if(value) return undefined;
    return "Field is required";
};

export const maxLengthValidateCreator = length => {
    return value => {
       return value && value.length > length ? `Max length is ${length}` : undefined;
    }
};