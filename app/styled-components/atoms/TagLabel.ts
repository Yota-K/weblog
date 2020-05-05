import styled from 'styled-components';
import { colorObj } from '../variables';

export const TagLabel = styled.span`
    display: inline-block;
    margin-right: 10px;
    margin: 8px 8px 8px 0;
    a {
        display: inline-block;
        padding: 0.2rem;
        border-radius: 3px;
        border: 1px solid ${colorObj.baseBlue};
        color: ${colorObj.baseBlue} !important;
    }
`
