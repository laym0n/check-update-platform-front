import {useMemo} from "react";
import {PluginSelectProps} from "src/shared/components/PluginsSelectList/PluginSelectViewController";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";

export type PluginsSelectListViewController = {
    pluginProps: PluginSelectProps[],
    selectedPluginId: string,
}

const usePluginsSelectListViewController: () => PluginsSelectListViewController = () => {
    console.log('usePluginsSelectListViewController')
    const {selectedPluginId, plugins} = usePluginSelectListContext();

    let pluginProps = useMemo(() => {
        return plugins.map(pluginInfo => {
            return {
                plugin: pluginInfo,
                isSelect: pluginInfo.id === selectedPluginId,
            } as PluginSelectProps
        });
    }, [selectedPluginId, plugins]);

    return {
        pluginProps: pluginProps,
        selectedPluginId: selectedPluginId,
    } as PluginsSelectListViewController;
}

export default usePluginsSelectListViewController;