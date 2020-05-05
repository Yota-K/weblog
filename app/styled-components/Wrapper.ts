import styled from 'styled-components';
import { device } from './MediaQuery';

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 80px auto 0;
    ${device.laptop} {
        display: block;
    }
`
