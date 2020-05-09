import React,{ useState, useEffect} from 'react';
import Link from 'next/link';

import { API } from '../../api/api';

import { H4 } from '../../styled-components/atoms/Heading';
import { SidebarBox } from '../../styled-components/BlogSidebar';
import { TagLabel } from '../../styled-components/atoms/TagLabel';
import { TagArea } from '../../styled-components/organisms/TagArea';

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
