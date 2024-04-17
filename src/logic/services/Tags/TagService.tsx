import {AutocompleteTagsResponseDto, CancelablePromise} from "src/api/generated";

export interface TagService {
    getTags(): CancelablePromise<AutocompleteTagsResponseDto>;
}
