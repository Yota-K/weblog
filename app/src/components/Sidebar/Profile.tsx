import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { H4 } from '../../../share/Heading';
import { SidebarBox } from './SidebarBox';

const Profile: React.FC = () => {
    return(
        <SidebarBox>
            <H4>プロフィール</H4>
            <div className="profile-area">
                <LazyLoadImage
                    className='profile-icon'
                    src='/icon.png'
                    alt='icon'
                    effect="blur"
                />
                <p>カルキチ副島です。</p>
                <p>都内でウェブ系の開発やっています。</p>
                <p>普段開発しているものや、日常について書いています。</p>
                <p>よろぴ</p>
            </div>
        </SidebarBox>
    );
}

export default Profile;