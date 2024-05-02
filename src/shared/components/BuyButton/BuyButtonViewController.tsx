import {DistributionMethodDto} from "src/api/generated";
import {useCallback, useEffect, useState} from "react";
import {useLayoutContext} from "src/pages/layout/LayoutContext";
import {diContainer, TYPES} from "src/logic/Config";
import {PluginUsageService} from "src/logic/services/PluginUsage";
import NotAuthorizedError from "src/logic/errors/NotAuthorizedError";
import {useSnackbar} from "notistack";

export type BuyButtonViewController = {
    onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement>;
    disableBuyButton: boolean;
    width: string,
    buyButtonToolTipTitle: string,
}

export type BuyButtonProps = {
    width?: string,
    isDisabled?: boolean,
    getPluginId: () => string,
    getDistributionMethod: () => DistributionMethodDto,
}

const useBuyButtonViewController: (props: BuyButtonProps) => BuyButtonViewController = (props) => {
    const layoutContext = useLayoutContext();

    const [width, setWidth] = useState(props.width)
    const [disableBuyButton, setDisableBuyButton] = useState(!layoutContext.isAuthenticated)
    const [buyButtonToolTip, setBuyButtonToolTip] = useState(disableBuyButton ? 'Need authentication' : '')

    useEffect(() => {
        setWidth(props.width)
    }, [props.width]);
    useEffect(() => {
        setDisableBuyButton(!layoutContext.isAuthenticated)
        setBuyButtonToolTip(!layoutContext.isAuthenticated ? 'Need authentication' : '')
    }, [layoutContext.isAuthenticated]);

    const {enqueueSnackbar} = useSnackbar();
    const onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        if (props.isDisabled) {
            return
        }
        const distributionMethod = props.getDistributionMethod();
        const pluginId = props.getPluginId();
        const pluginUsageService = diContainer.get<PluginUsageService>(TYPES.PluginUsageService);
        pluginUsageService.createPluginUsage({
            pluginId: pluginId,
            distributionMethod: distributionMethod,
        })
            .catch(error => {
                    console.error('Произошла ошибка:', error.message);
                    enqueueSnackbar('Error on buy', {variant: 'error'})
                    if (error instanceof NotAuthorizedError) {
                        layoutContext.setIsAuthenticated(false)
                    }
                }
            )
            .then(response => {
                if (!response) {
                    return
                }
                enqueueSnackbar(`Success ${response.distributionMethod.type?.toLowerCase()}`, {variant: 'success'});
                console.log('success buy')
            });
    }, [enqueueSnackbar, layoutContext, props]);
    return {
        buyButtonToolTipTitle: buyButtonToolTip,
        width: width,
        disableBuyButton: disableBuyButton,
        onBuyButtonClick: onBuyButtonClick,
    } as BuyButtonViewController;
}

export default useBuyButtonViewController;