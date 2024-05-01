import React, {useCallback, useEffect, useState} from 'react';

export type TextFieldWithInitViewController = {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    placeholder: string;
}

export type TextFieldWithInitProps = {
    initValue: string;
    onValueChange: (value: string) => void;
    placeholder: string;
}


const useTextFieldWithInitViewController: (props: TextFieldWithInitProps) => TextFieldWithInitViewController = (props) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        setValue(props.initValue)
        props.onValueChange(props.initValue)
    }, [props]);

    const onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void = useCallback((event) => {
        setValue(event.target.value)
        props.onValueChange(event.target.value)
    }, [props]);

    return {
        value: value,
        onChange: onChange,
        placeholder: props.placeholder,
    } as TextFieldWithInitViewController;
}

export default useTextFieldWithInitViewController;
