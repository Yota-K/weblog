import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { TaxonomyList } from '../../interfaces/taxonomy';

import { colorObj } from '../../share/variables';
import { SidebarBox } from './SidebarBox';
import { H4 } from '../../share/Heading';

interface Props {
    categories: TaxonomyList[]
}

const CategoryList: React.FC<Props> = ({ categories }) => {
    return(
        <SidebarBox>
            <H4>カテゴリー</H4>
            <CategoryUl>
            {categories.map((category: any) => 
                <li key={category.id}>
                    <Link href="/category/[id]" as={`/category/${category.id}`}><a>{category.name}</a></Link>
                </li>
            )}
            </CategoryUl>
        </SidebarBox>
    );
}

const CategoryUl = styled.ul`
    list-style: none;
    li {
        padding: 10px;
        font-size: 1rem;
        border-bottom: 1px solid #ddd;
        a {
            color: ${colorObj.fontColor};
        }
    }
`

export default CategoryList;
