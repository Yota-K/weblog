import styled from 'styled-components';
import { colorObj } from '../variables';

export const HeaderBar = styled.header`
    margin-bottom: 30px;
    padding: 14px;
    background: ${colorObj.baseBlack};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    text-align: center;
    a {
        color: #fff;
    }
`;

export const FooterBar = styled.footer`
    margin-top: 50px;
    padding: 20px;
`;
