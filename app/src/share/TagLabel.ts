import styled from 'styled-components';

import { colorObj } from './variables';

export const TagLabel = styled.span<{
  margin?: string;
  marginRight?: string;
}>`
  display: inline-block;
  margin: ${(props) => (props.margin ? props.margin : '0 6px 0 0')};
  line-height: 1.2;

  &:last-child {
    margin-right: ${(props) => (props.margin ? props.marginRight : '0px')};
  }

  a {
    display: inline-block;
    padding: 3px;
    border-radius: 3px;
    border: 1px solid ${colorObj.baseBlue};
    color: ${colorObj.baseBlue} !important;

    &:hover {
      background: ${colorObj.baseBlue};
      color: #fff !important;
      transition: all 0.3s;
    }
  }
`;
