import Link from 'next/link';
import React from 'react';

import { Taxonomy } from '@/types/taxonomy';

import { H4 } from '@/share/Heading';
import { TagArea } from '@/share/TagArea';
import { TagLabel } from '@/share/TagLabel';

import { SidebarBox } from '@/components/Sidebar/SidebarBox';

type Props = {
  tags: Taxonomy[];
};

const TagList: React.FC<Props> = ({ tags }) => {
  return (
    <SidebarBox>
      <H4>タグ</H4>
      <TagArea padding="0 7px">
        {tags.map((tag) => (
          <TagLabel margin="4px" key={tag.id}>
            <Link href="/tags/[id]" as={`/tags/${tag.id}`}>
              <a>{tag.name}</a>
            </Link>
          </TagLabel>
        ))}
      </TagArea>
    </SidebarBox>
  );
};

export default TagList;
