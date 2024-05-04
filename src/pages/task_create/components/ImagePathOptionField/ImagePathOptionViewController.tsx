import {useCallback, useEffect, useState} from "react";

export type ImagePathOptionViewController = {
    onDeleteClick: React.MouseEventHandler<HTMLButtonElement>;
    onChangeSelectedPath: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedPath: string;
}

export type ImagePathOptionProps = {
    logoPath?: string;
    index: number;
    onChangePath: (newPath: string, index: number) => void;
    onDelete: (index: number) => void;
}


const useImagePathOptionViewController: (props: ImagePathOptionProps) => ImagePathOptionViewController = (props) => {
    const [selectedPath, setSelectedPath] = useState(props.logoPath || '')
    console.log('useImagePathOptionViewController')
    useEffect(() => {
        setSelectedPath(props.logoPath || '')
    }, [props.logoPath]);

    const onChangeSelectedPath: (event: React.ChangeEvent<HTMLInputElement>) => void = useCallback((event) => {
        const newPath = event.target.value;
        setSelectedPath(newPath)
        props.onChangePath(newPath, props.index)
    }, [props]);
    const onDeleteClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        props.onDelete(props.index)
    }, [props]);

    return {
        selectedPath: selectedPath,
        onChangeSelectedPath: onChangeSelectedPath,
        onDeleteClick: onDeleteClick,
    } as ImagePathOptionViewController;
}

export default useImagePathOptionViewController;
