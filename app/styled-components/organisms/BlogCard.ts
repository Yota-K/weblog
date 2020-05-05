import styled from 'styled-components';
import { colorObj } from '../variables';

export const BlogCard = styled.div`
    margin: 20px 0;
    padding: 10px 0;
    border-top: 1px solid ${colorObj.borderGray};
    border-bottom: 1px solid ${colorObj.borderGray};
    a {
        color: ${colorObj.baseBlack};
    }
`;
