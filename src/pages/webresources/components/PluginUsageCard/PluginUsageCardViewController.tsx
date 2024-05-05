import {PluginUsageDto} from "src/api/generated";
import moment from "moment/moment";

export type PluginUsageCardViewController = {
    pluginUsageDto: PluginUsageDto,
    duration: string | undefined,
}

export type PluginUsageCardProps = {
    pluginUsageDto: PluginUsageDto,
}

const usePluginUsageCardController: (props: PluginUsageCardProps) => PluginUsageCardViewController = (props: PluginUsageCardProps) => {
    console.log('usePluginUsageCardController')
    let duration = props.pluginUsageDto.distributionMethod.duration ?
        moment.duration(props.pluginUsageDto.distributionMethod.duration).humanize()
        : undefined
    return {
        pluginUsageDto: props.pluginUsageDto,
        duration: duration,
    } as PluginUsageCardViewController;
};
export default usePluginUsageCardController;