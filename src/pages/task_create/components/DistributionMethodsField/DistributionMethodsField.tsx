import * as React from 'react';
import useDistributionMethodsFieldViewController, {
    DistributionMethodsFieldProps
} from "src/pages/task_create/components/DistributionMethodsField/DistributionMethodsFieldViewController";
import {Button} from "@mui/material";
import DistributionMethodOption
    from "src/pages/task_create/components/DistributionMethodOption/DistributionMethodOption";


export default function DistributionMethodsField(props: DistributionMethodsFieldProps) {
    let viewController = useDistributionMethodsFieldViewController(props);

    return (
        <>
            {viewController.distributionMethods.map((method, index) => {
                return (
                    <DistributionMethodOption key={index}
                                              index={index}
                                              distributionMethodDto={method}
                                              onDistributionMethodChange={viewController.onDistributionMethodChange}
                                              onDeleteClick={viewController.onDeleteMethodClick}/>
                )
            })}
            <Button onClick={viewController.onAddClick}>ADD DISTRIBUTION</Button>
        </>
    );
}
