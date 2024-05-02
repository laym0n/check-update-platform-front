import {createContext, ReactNode, useContext, useMemo, useState} from "react";

type PluginSelectListContext = {
    selectedPluginId: string,
    setSelectedPluginId: React.Dispatch<React.SetStateAction<string>>
}

const defaultLayoutContextType: PluginSelectListContext = {
    selectedPluginId: '',
    setSelectedPluginId: () => {
    },
};

let Context = createContext<PluginSelectListContext>(defaultLayoutContextType);

export function usePluginSelectListContext() {
    return useContext(Context);
}

export function PluginSelectListContextProvider(props: PluginSelectListContextProviderProps) {
    console.log('PluginSelectListContextProvider')
    const [selectedPluginId, setSelectedPluginId] = useState('')
    const initialState: PluginSelectListContext = useMemo<PluginSelectListContext>(() => {
        return {
            selectedPluginId: selectedPluginId,
            setSelectedPluginId: setSelectedPluginId,
        }
    }, [selectedPluginId])
    return (
        <Context.Provider value={initialState}>
            {props.children}
        </Context.Provider>
    );
}

type PluginSelectListContextProviderProps = {
    children?: ReactNode
}
