import React,{ useState, useEffect} from 'react';
import styled from 'styled-components';

import { API } from '../../api/api';

import Profile from './Profile';
import CategoryList from './CategoryList';
import TagList from './TagList';

import { device } from '../../share/media-query';

interface TaxonomyList {
    tags: [];
    categories: [];
}

const Sidebar: React.FC = () => {
    const [taxonomyList, setTaxonomyList] = React.useState<{tags: any, categories: any}>({
        tags: [],
        categories: [],
    });

    useEffect(() => {
        const getTaxonomyList = async () => {
            const url = API.BASE_URL;
            const api = new API();
            const data = await api.getTaxonomyList(url);
            setTaxonomyList({
                tags: data.tags,
                categories: data.categories
            })
        }
        getTaxonomyList();
    }, []);

    return(
        <BlogSidebar>
            <Profile />
            <CategoryList categories={taxonomyList.categories} />
            <TagList tags={taxonomyList.tags} />
        </BlogSidebar>
    );
}

const BlogSidebar = styled.article`
    width: 340px;
    margin-left: 50px;
    ${device.laptop} {
        width: 100%;
        margin: 80px 0 0 0;
    }
`

export default Sidebar;
