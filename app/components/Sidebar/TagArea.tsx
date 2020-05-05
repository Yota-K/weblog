import React,{ useState, useEffect} from 'react';
import Link from 'next/link';
import axios from 'axios';

import { API } from '../../api/api';
import { TagJson } from '../../interfaces/tag';

import { H4 } from '../../styled-components/atoms/Heading';
import { SidebarBox } from '../../styled-components/BlogSidebar';
import { TagLabel } from '../../styled-components/atoms/TagLabel';

interface Tag {
    tags: TagJson[];
}

const TagArea: React.FC = () => {
    const [tagList, setTagList] = React.useState<Tag>({
        tags: [],
    });

    useEffect(() => {
        const getTags = async () => {
            const api = new API();
            const data = await api.getTaxonomyList(API.BASE_URL, 'tags')
            setTagList({
                tags: data,
            })
        }
        getTags();
    }, []);

    return(
        <SidebarBox>
            <H4>タグ一覧</H4>
            {tagList.tags.map(tag =>
                <TagLabel key={tag.id}>
                    <Link href="/tags/[id]" as={`/tags/${tag.id}`}><a>{tag.name}</a></Link>
                </TagLabel>
            )}
        </SidebarBox>
    );
}

export default TagArea;
