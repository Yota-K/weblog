import styled from 'styled-components';
import { device } from './MediaQuery';

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 80px auto 0;
    ${device.laptop} {
        display: block;
        margin: 60px auto 0;
    }
    ${device.mobileM} {
        display: block;
        margin: 40px auto 0;
    }
`;
