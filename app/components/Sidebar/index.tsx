import React from 'react';

import Profile from './Profile';
import TagList from './TagList';
import TwitterTimeLine from './TwitterTimeLine';

import { BlogSidebar } from '../../styled-components/BlogSidebar';

const Sidebar: React.FC = () => {
    return(
        <BlogSidebar>
            <Profile />
            <TagList />
            <TwitterTimeLine />
        </BlogSidebar>
    );
}

export default Sidebar;
