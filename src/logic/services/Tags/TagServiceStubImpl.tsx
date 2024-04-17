import {AutocompleteClient, AutocompleteTagsResponseDto, CancelablePromise} from "../../../api/generated";
import {TagService} from "./TagService";
import {injectable} from "inversify";

// @ts-ignore
@injectable()
export class TagServiceStubImpl implements TagService {
    getTags(): CancelablePromise<AutocompleteTagsResponseDto> {
        return AutocompleteClient.getTags();
    }
}
