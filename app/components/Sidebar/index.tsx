import * as React from 'react';

import Profile from './Profile';
import TagArea from './TagArea';
import TwitterTimeLine from './TwitterTimeLine';

import { BlogSidebar } from '../../styled-components/BlogSidebar';

const Sidebar: React.FC = () => {
    return(
        <BlogSidebar>
            <Profile />
            <TagArea />
            <TwitterTimeLine />
        </BlogSidebar>
    );
}

export default Sidebar;
