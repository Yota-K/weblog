import styled from 'styled-components';
import { colorObj } from './variables';

type StyleType = {
  type: string;
};

export const MyPaginate = styled.div<StyleType>`
  display: flex;
  justify-content: ${(props) => props.type};
  a {
    color: ${colorObj.baseBlue};
  }
`;
