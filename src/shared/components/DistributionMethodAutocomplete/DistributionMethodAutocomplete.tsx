import {DistributionMethodDto} from "src/api/generated";
import moment from "moment/moment";

export type DistributionMethodAutocompleteDto = {
    label: string,
    distributionMethodDto: DistributionMethodDto
}

export function mapToDistributionMethodAutocompleteDto(distributionMethods?: DistributionMethodDto[]): DistributionMethodAutocompleteDto[] {
    return (distributionMethods || []).map((method: DistributionMethodDto) => {
        let label: string;
        if (method.type === DistributionMethodDto.type.PURCHASE) {
            label = `${method.cost} РУБ`
        } else {
            let duration = moment.duration(method.duration!).humanize()
            label = `${method.cost} РУБ/${duration}`
        }
        return {
            label: label,
            distributionMethodDto: method
        } as DistributionMethodAutocompleteDto;
    })
}