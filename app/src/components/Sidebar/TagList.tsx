import Link from 'next/link';
import React from 'react';

import { Taxonomy } from '../../../interfaces/taxonomy';

import { H4 } from '../../../share/Heading';
import { TagArea } from '../../../share/TagArea';
import { TagLabel } from '../../../share/TagLabel';

import { SidebarBox } from './SidebarBox';

interface Props {
  tags: Taxonomy[];
}

const TagList: React.FC<Props> = ({ tags }) => {
  return (
    <SidebarBox>
      <H4>タグ</H4>
      <TagArea>
        {tags.map((tag) => (
          <TagLabel key={tag.id}>
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
