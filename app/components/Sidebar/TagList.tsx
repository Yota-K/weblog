import React from 'react';
import Link from 'next/link';

import { TaxonomyList } from '../../interfaces/taxonomy';

import { SidebarBox } from './SidebarBox';
import { H4 } from '../../share/Heading';
import { TagArea } from '../../share/TagArea';
import { TagLabel } from '../../share/TagLabel';

interface Props {
    tags: TaxonomyList[]
}

const TagList: React.FC<Props> = ({ tags }) => {
    return(
        <SidebarBox>
            <H4>タグ</H4>
            <TagArea>
            {tags.map((tag: any) => 
                <TagLabel key={tag.id}>
                    <Link href="/tags/[id]" as={`/tags/${tag.id}`}><a>{tag.name}</a></Link>
                </TagLabel>
            )}
            </TagArea>
        </SidebarBox>
    );
}

export default TagList;
