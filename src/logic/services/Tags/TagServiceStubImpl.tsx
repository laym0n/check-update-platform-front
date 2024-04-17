import {AutocompleteTagsResponseDto, CancelablePromise} from "../../../api/generated";
import {TagService} from "./TagService";
import {injectable} from "inversify";

// @ts-ignore
@injectable()
export class TagServiceStubImpl implements TagService {
    getTags(): CancelablePromise<AutocompleteTagsResponseDto> {
        return new CancelablePromise<AutocompleteTagsResponseDto>(resolve => {
            resolve({
                tags: ["tag1", "tag2", "tag3"]
            })
        });
    }
}
