import {PluginInfoDto} from "src/api/generated";
import {useCallback, useEffect, useState} from "react";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";

export type PluginSelectViewController = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    isSelect: boolean;
    plugin: PluginInfoDto;
}

export type PluginSelectProps = {
    plugin: PluginInfoDto;
    isSelect: boolean;
}

const usePluginSelectViewController: (props: PluginSelectProps) => PluginSelectViewController = (props) => {
    console.log('usePluginSelectViewController')
    const [plugin, setPlugin] = useState(props.plugin)
    const [isSelect, setIsSelect] = useState(props.isSelect)

    useEffect(() => {
        setPlugin(props.plugin)
    }, [props.plugin]);
    useEffect(() => {
        setIsSelect(props.isSelect)
    }, [props.isSelect]);

    const pluginSelectListContext = usePluginSelectListContext();
    const onClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        pluginSelectListContext.setSelectedPluginId(plugin.id)
    }, [plugin, pluginSelectListContext]);

    return {
        plugin: plugin,
        isSelect: isSelect,
        onClick: onClick,
    } as PluginSelectViewController;
}

export default usePluginSelectViewController;