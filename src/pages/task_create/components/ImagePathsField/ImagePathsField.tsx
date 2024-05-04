import * as React from 'react';
import {Button} from "@mui/material";
import useImagePathsFieldViewController, {
    ImagePathsFieldProps
} from "src/pages/task_create/components/ImagePathsField/ImagePathsFieldViewController";
import ImagePathOption from "src/pages/task_create/components/ImagePathOptionField/ImagePathOption";


export default function ImagePathsField(props: ImagePathsFieldProps) {
    let viewController = useImagePathsFieldViewController(props);

    return (
        <>
            {viewController.imagePaths.map((path, index) => {
                return (
                    <ImagePathOption key={index}
                                     index={index}
                                     onChangePath={viewController.onChangePath}
                                     onDelete={viewController.onDeleteImagePath}
                                     logoPath={path}/>
                )
            })}
            <Button onClick={viewController.onAddClick}>ADD IMAGE</Button>
        </>
    );
}
