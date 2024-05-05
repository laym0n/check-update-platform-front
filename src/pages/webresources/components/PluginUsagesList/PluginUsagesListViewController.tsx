import {useEffect, useState} from "react";
import {diContainer, TYPES} from "src/logic/Config";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";
import {PluginUsageCardProps} from "src/pages/webresources/components/PluginUsageCard";
import {PluginUsageService} from "src/logic/services/PluginUsage";

export type PluginUsagesListViewController = {
    cardProps: PluginUsageCardProps[],
}

const usePluginUsagesListViewController: () => PluginUsagesListViewController = () => {
    console.log('usePluginUsagesListViewController')
    const [cardProps, setCardProps] = useState([] as PluginUsageCardProps[])
    const {selectedPluginId} = usePluginSelectListContext();

    useEffect(() => {
        if (!selectedPluginId) {
            return
        }
        const pluginUsageService = diContainer.get<PluginUsageService>(TYPES.PluginUsageService);
        pluginUsageService
            .get({pluginIds: [selectedPluginId]})
            .then((response) => {
                const newCardProps = response.pluginUsages
                    .map(usage => {
                        return {
                            pluginUsageDto: usage,
                        } as PluginUsageCardProps;
                    });
                setCardProps(newCardProps)
            })
    }, [selectedPluginId]);
    return {
        cardProps: cardProps,
    } as PluginUsagesListViewController;
};
export default usePluginUsagesListViewController;