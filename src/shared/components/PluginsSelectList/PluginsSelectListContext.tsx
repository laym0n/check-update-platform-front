import {createContext, ReactNode, useContext, useMemo, useState} from "react";
import {PluginInfoDto} from "src/api/generated";

type PluginSelectListContext = {
    selectedPluginId: string,
    setSelectedPluginId: React.Dispatch<React.SetStateAction<string>>
    plugins: PluginInfoDto[],
    setPlugins: React.Dispatch<React.SetStateAction<PluginInfoDto[]>>
}

const defaultLayoutContextType: PluginSelectListContext = {
    selectedPluginId: '',
    setSelectedPluginId: () => {
    },
    plugins: [],
    setPlugins: () => {
    }
};

let Context = createContext<PluginSelectListContext>(defaultLayoutContextType);

export function usePluginSelectListContext() {
    return useContext(Context);
}

export function PluginSelectListContextProvider(props: PluginSelectListContextProviderProps) {
    console.log('PluginSelectListContextProvider')
    const [selectedPluginId, setSelectedPluginId] = useState('')
    const [plugins, setPlugins] = useState([] as PluginInfoDto[])
    const initialState: PluginSelectListContext = useMemo<PluginSelectListContext>(() => {
        return {
            selectedPluginId: selectedPluginId,
            setSelectedPluginId: setSelectedPluginId,
            plugins: plugins,
            setPlugins: setPlugins,
        }
    }, [plugins, selectedPluginId])
    return (
        <Context.Provider value={initialState}>
            {props.children}
        </Context.Provider>
    );
}

type PluginSelectListContextProviderProps = {
    children?: ReactNode
}
