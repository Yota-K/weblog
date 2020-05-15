import React,{ useState, useEffect} from 'react';
import Link from 'next/link';

import { API } from '../../api/api';

import { SidebarBox } from './SidebarBox';
import { H4 } from '../../share/Heading';
import { TagArea } from '../../share/TagArea';
import { TagLabel } from '../../share/TagLabel';

const TagList: React.FC = () => {
    const [tagAry, setTagAry] = React.useState<{tags: any}>({
        tags: [],
    });

    useEffect(() => {
        const getTags = async () => {
            const url = API.BASE_URL;
            const api = new API();
            const data = await api.getTaxonomyList(url, 'tags');
            setTagAry({
                tags: data
            })
        }
        getTags();
    }, []);

    return(
        <SidebarBox>
            <H4>タグ一覧</H4>
            <TagArea>
            {tagAry.tags.map((tag: any) => 
                <TagLabel key={tag.id}>
                    <Link href="/tags/[id]" as={`/tags/${tag.id}`}><a>{tag.name}</a></Link>
                </TagLabel>
            )}
            </TagArea>
        </SidebarBox>
    );
}

export default TagList;
