import {useCallback, useEffect, useState} from "react";

export type ImagePathsFieldViewController = {
    onAddClick: React.MouseEventHandler<HTMLButtonElement>;
    imagePaths: string[];
    onChangePath: (newPath: string, key: number) => void,
    onDeleteImagePath: (key: number) => void
}

export type ImagePathsFieldProps = {
    initImagePaths?: string[];
    onImagePathsChangeFromProps: (paths: string[]) => void;
}


const useImagePathsFieldViewController: (props: ImagePathsFieldProps) => ImagePathsFieldViewController = (props) => {
    const [imagePaths, setImagePaths] = useState([] as string[])
    const {initImagePaths, onImagePathsChangeFromProps} = props;
    console.log('useImagePathsFieldViewController')
    const onDeleteImagePath: (key: number) => void = useCallback((key) => {
        let newImagePathProps = [...imagePaths];
        newImagePathProps.splice(key, 1);
        setImagePaths(newImagePathProps)
        onImagePathsChangeFromProps(newImagePathProps)
    }, [imagePaths, onImagePathsChangeFromProps]);

    const onChangePath: (newPath: string, key: number) => void = useCallback((newPath, key) => {
        const newImagePathProps = [...imagePaths];
        newImagePathProps[key] = newPath;
        setImagePaths(newImagePathProps)
        onImagePathsChangeFromProps(newImagePathProps)
    }, [onImagePathsChangeFromProps, imagePaths]);

    useEffect(() => {
        const newImagePathProps = (initImagePaths || [])
        setImagePaths(newImagePathProps)
        onImagePathsChangeFromProps(newImagePathProps)
    }, [initImagePaths, onImagePathsChangeFromProps]);


    const onAddClick = useCallback(() => {
        const newImagePathProps = [...imagePaths, ''];
        setImagePaths(newImagePathProps)
        onImagePathsChangeFromProps(newImagePathProps);
    }, [imagePaths, onImagePathsChangeFromProps]);

    return {
        onAddClick: onAddClick,
        imagePaths: imagePaths,
        onChangePath: onChangePath,
        onDeleteImagePath: onDeleteImagePath,
    } as ImagePathsFieldViewController;
}

export default useImagePathsFieldViewController;
