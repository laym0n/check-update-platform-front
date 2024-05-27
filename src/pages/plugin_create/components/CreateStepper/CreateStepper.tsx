import React, {useState} from "react";
import PlatformAPI from "./check-update-platform-api.yaml";
import PluginAPI from "./plugin-api.yaml";
import {Box, Button, Step, StepButton, Stepper, Typography} from "@mui/material";


export const CreateStepper = () => {
    const [isHiddenFirst, setIsHiddenFirst] = useState(false)
    const [isHiddenSecond, setIsHiddenSecond] = useState(true)
    const [isHiddenThird, setIsHiddenThird] = useState(true)
    let labels = ["Implement API", "Submit form", "Create update task"]
    console.log("CreateStepper render")
    const [activeStep, setActiveStep] = useState(0)

    let handleStep: (index: number) => void = (index: number) => {
        if (index === 0) {
            setIsHiddenFirst(false);
            setIsHiddenSecond(true);
            setIsHiddenThird(true);
        } else if (index === 1) {
            setIsHiddenFirst(true);
            setIsHiddenSecond(false);
            setIsHiddenThird(true);
        } else {
            setIsHiddenFirst(true);
            setIsHiddenSecond(true);
            setIsHiddenThird(false);
        }
        setActiveStep(index)
    }
    return (
        <Box sx={{width: '100%', paddingBottom: 2}}>
            <Stepper nonLinear activeStep={activeStep} sx={{margin: 2, marginBottom: 4}}>
                {labels.map((label, index) => (
                    <Step key={label}>
                        <StepButton color="inherit" onClick={() => handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{display: isHiddenFirst ? "none" : "block"}}>
                <Typography>Реализовать API в своем плагине</Typography>
                <a
                    href={PluginAPI}
                    download="openapi-plugin.yaml"
                    target="_blank"
                    rel="noreferrer">
                    <Button>Скачать спецификацию для реализации</Button>
                </a>
                <Typography>Обращаться к платформе можно через API, спецификация котрого доступна по кнопке
                    ниже</Typography>
                <a
                    href={PlatformAPI}
                    download="openapi-platform.yaml"
                    target="_blank"
                    rel="noreferrer">
                    <Button>Скачать спецификацию платформы</Button>
                </a>
            </Box>
            <Box sx={{display: isHiddenSecond ? "none" : "block"}}>
                <Typography>Заполнить форму выше и отправить ее</Typography>
            </Box>
            <Box sx={{display: isHiddenThird ? "none" : "block"}}>
                <Typography>После отправки формы нужно создать задачу на обновление информации о плагине</Typography>
            </Box>
        </Box>
    );
};

