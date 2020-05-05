import * as React from 'react';

import { H4 } from '../../styled-components/atoms/Heading';
import { SidebarBox } from '../../styled-components/BlogSidebar';

const Profile: React.FC = () => {
    return(
        <SidebarBox>
            <H4>プロフィール</H4>
            <div className="profile-area">
                <img className="profile-icon" src="/icon.png" alt="icon" />
                <p>カルキチ副島です。</p>
                <p>都内でウェブ系の開発やっています。</p>
                <p>普段開発しているものや、日常について書いています。</p>
                <p>よろぴ</p>
            </div>
        </SidebarBox>
    );
}

export default Profile;
