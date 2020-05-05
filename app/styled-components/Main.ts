import styled from 'styled-components';
import { device } from './MediaQuery';

export const Main = styled.main`
    width: 740px;
    ${device.laptop} {
        width: 100%;
    }
`
