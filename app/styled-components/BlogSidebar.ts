import styled from 'styled-components';
import { device } from './MediaQuery';
import { colorObj } from './variables';

export const BlogSidebar = styled.article`
    width: 340px;
    margin-left: 50px;
    ${device.laptop} {
        width: 100%;
        margin: 80px 0 0 0;
    }
`;

export const SidebarBox = styled.div`
    margin-bottom: 30px;
    line-height: 1.6;
    h4 {
        margin-bottom: 15px;
        padding: 10px 20px;
        background: ${colorObj.subBlue};
        border-radius: 3px;
    }
    .profile-icon {
        width: 100px;
        height: auto;
        display: inline-block;
        margin: 20px 0;
        border: 1px solid ${colorObj.borderGray};
        border-radius: 50%;
    }
`;
