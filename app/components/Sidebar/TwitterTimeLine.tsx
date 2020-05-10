import React, { useEffect } from 'react';

import { H4 } from '../../styled-components/atoms/Heading';
import { SidebarBox } from '../../styled-components/BlogSidebar';

const TwitterTimeLine: React.FC = () => {
    useEffect(() => {
        const timeline:(HTMLElement | null) = document.getElementById('timeline');
        const script = document.createElement('script');
        script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
        // ! nullでなければ要素を追加。nullなら実行しない
        timeline!.appendChild(script);
    }, []);

    return(
        <SidebarBox>
            <H4>Twitter</H4>
            <div id="timeline">
                <a 
                    className="twitter-timeline" 
                    data-width="100%" 
                    data-height="500" 
                    href="https://twitter.com/karukichi_yah?ref_src=twsrc%5Etfw"
                >Tweets by karukichi_yah</a> 
            </div>
        </SidebarBox>
    );
}

export default TwitterTimeLine;
