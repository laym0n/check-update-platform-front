import {PluginInfoDto} from "src/api/generated";
import {useMemo} from "react";
import {PluginSelectProps} from "src/shared/components/PluginsSelectList/PluginSelectViewController";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";

export type PluginsSelectListViewController = {
    pluginProps: PluginSelectProps[],
    selectedPluginId: string,
}

export type PluginsSelectListProps = {
    plugins: PluginInfoDto[],
}

const usePluginsSelectListViewController: (props: PluginsSelectListProps) => PluginsSelectListViewController = (props) => {
    console.log('usePluginsSelectListViewController')
    const pluginSelectListContext = usePluginSelectListContext();

    let pluginProps = useMemo(() => {
        return props.plugins.map(pluginInfo => {
            return {
                plugin: pluginInfo,
                isSelect: pluginInfo.id === pluginSelectListContext.selectedPluginId,
            } as PluginSelectProps
        });
    }, [pluginSelectListContext.selectedPluginId, props.plugins]);

    return {
        pluginProps: pluginProps,
        selectedPluginId: pluginSelectListContext.selectedPluginId,
    } as PluginsSelectListViewController;
}

export default usePluginsSelectListViewController;