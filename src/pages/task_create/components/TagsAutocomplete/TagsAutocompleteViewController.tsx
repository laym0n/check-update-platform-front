import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {TagInfoDto} from "src/api/generated";

export type TagsAutocompleteViewController = {
    onTagAutocompleteChange: (event: React.SyntheticEvent, value: (TagInfoDto | string)[]) => void;
    selectedTags: TagInfoDto[];
    tags: TagInfoDto[];
}

export type TagsAutocompleteProps = {
    tags: string[];
    selectedTags?: TagInfoDto[];
    onSelectedTagsChange: (tags: string[]) => void;
}


const useTagsAutocompleteViewController: (props: TagsAutocompleteProps) => TagsAutocompleteViewController = (props) => {
    const optionTags = useMemo(() => {
        return props.tags.map(tag => {
            return {
                tag: tag,
                isNew: false,
            } as TagInfoDto;
        })
    }, [props.tags]);

    const [selectedTags, setSelectedTags] = useState([] as TagInfoDto[])
    useEffect(() => {
        setSelectedTags(props.selectedTags || [])
        props.onSelectedTagsChange(props.selectedTags?.map(tag => tag.tag) || [])
    }, [props, props.selectedTags]);


    let onTagAutocompleteChange: (event: React.SyntheticEvent, value: (TagInfoDto | string)[]) => void = useCallback((event, newSelectedTagsOptions) => {
        newSelectedTagsOptions.forEach(stag => console.log(stag))
        const newTagInfoDtos = newSelectedTagsOptions.map(tag => {
            if (typeof tag === 'string') {
                return {
                    tag: tag,
                    isNew: true,
                } as TagInfoDto;
            } else {
                return tag
            }
        });
        setSelectedTags(newTagInfoDtos)
        const selectedTagsStrings = newTagInfoDtos.map(tagInfoDto => tagInfoDto.tag);
        props.onSelectedTagsChange(selectedTagsStrings)
    }, [props]);

    return {
        tags: optionTags,
        selectedTags: selectedTags,
        onTagAutocompleteChange: onTagAutocompleteChange,
    } as TagsAutocompleteViewController;
}

export default useTagsAutocompleteViewController;
