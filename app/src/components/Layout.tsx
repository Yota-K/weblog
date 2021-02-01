import React from 'react';
import styled from 'styled-components';

import { device } from '../../share/media-query';

const Layout: React.FC = ({ children }) => <Main>{children}</Main>;

const Main = styled.article`
  width: 100%;
  max-width: 820px;
  ${device.laptop} {
    max-width: initial;
  }
`;

export default Layout;
