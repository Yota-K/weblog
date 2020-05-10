import styled from 'styled-components';
import { device } from '../MediaQuery';
import { colorObj } from '../variables';

export const TagArea = styled.div`
    margin: 10px 0;
    ${device.mobileM} {
        margin: 5px 0;
    }
`;
