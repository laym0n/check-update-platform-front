import {PluginInfoDto} from "src/api/generated";
import {usePluginSelectListContext} from "src/shared/components/PluginsSelectList/PluginsSelectListContext";
import {useCallback, useEffect, useState} from "react";
import {diContainer, TYPES} from "src/logic/Config";
import {PluginService} from "src/logic/services/Plugin";
import {AccessTokenDialogProps} from "src/shared/components/access_token_dialog/AccessTokenDialogViewController";

export type PluginInfoCardViewController = {
    accessTokenDialogProps: AccessTokenDialogProps;
    onRefreshClick: React.MouseEventHandler<HTMLButtonElement>;
    pluginInfoDto: PluginInfoDto | undefined;
    baseUrl: string;
    name: string;
    onBaseUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitUpdate: React.FormEventHandler<HTMLDivElement>;
}

const usePluginInfoCardViewController: () => PluginInfoCardViewController = () => {
    console.log('usePluginInfoCardViewController')

    const {selectedPluginId, plugins, setPlugins} = usePluginSelectListContext();
    const [pluginInfoDto, setPluginInfoDto] = useState<PluginInfoDto | undefined>(undefined)
    const [baseUrl, setBaseUrl] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        const pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService
            .getOwnPlugins({ids: [selectedPluginId]})
            .then(response => {
                if (!response.plugins.length) {
                    setPluginInfoDto(undefined);
                    return
                }
                const newPluginInfoDto = response.plugins[0];
                setPluginInfoDto(newPluginInfoDto);
                setBaseUrl(newPluginInfoDto.baseUrl)
                setName(newPluginInfoDto.name)
            })
    }, [selectedPluginId])

    const onBaseUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void = useCallback((event) => {
        setBaseUrl(event.target.value)
    }, []);
    const onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void = useCallback((event) => {
        setName(event.target.value)
    }, []);

    const onSubmitUpdate: React.FormEventHandler<HTMLDivElement> = useCallback((event) => {
        event.preventDefault();
        const pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.update({
            baseUrl: baseUrl,
            name: name,
            pluginId: selectedPluginId,
        }).then(newPluginInfoDto => {
            setPluginInfoDto(newPluginInfoDto)
            const index = plugins.findIndex(plugin => plugin.id === newPluginInfoDto.id);
            if (index === -1) {
                return
            }
            let newPlugins = [...plugins]
            newPlugins[index] = newPluginInfoDto
            setPlugins(newPlugins);
        })

    }, [baseUrl, name, plugins, selectedPluginId, setPlugins]);

    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const onRefreshClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        const pluginService = diContainer.get<PluginService>(TYPES.PluginService);
        pluginService.refreshToken(selectedPluginId)
            .then(response => {
                setAccessToken(response.accessToken)
                setIsOpenDialog(true)
            })
    }, [selectedPluginId]);

    const onClose = useCallback(() => {
        setIsOpenDialog(false)
    }, []);

    return {
        pluginInfoDto: pluginInfoDto,
        baseUrl: baseUrl,
        name: name,
        onNameChange: onNameChange,
        onBaseUrlChange: onBaseUrlChange,
        onSubmitUpdate: onSubmitUpdate,
        onRefreshClick: onRefreshClick,
        accessTokenDialogProps: {
            accessToken: accessToken,
            isOpenDialog: isOpenDialog,
            onCloseClick: onClose,
        }
    } as PluginInfoCardViewController;
};
export default usePluginInfoCardViewController;
