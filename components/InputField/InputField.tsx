// InputField.tsx

import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    type: string;
    name: string;
    placeholder?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    classes?: string;
    [key: string]: unknown; // For any additional props
}

const InputField: React.FC<InputFieldProps> = ({ type, name, placeholder, value, onChange, classes, ...rest }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={classes}
            {...rest} // Spread rest of the props
        />
    );
};

export default InputField;
