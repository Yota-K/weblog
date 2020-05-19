import React from 'react';
import styled from 'styled-components';

import Profile from './Profile';
import TagList from './TagList';
import TwitterTimeLine from './TwitterTimeLine';

import { device } from '../../share/media-query';

const Sidebar: React.FC = () => {
    return(
        <BlogSidebar>
            <Profile />
            <TagList />
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
