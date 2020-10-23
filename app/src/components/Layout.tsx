import React from 'react';
import styled from 'styled-components';

import { device } from '../../share/media-query';

const Layout: React.FC = ({ children }) => <Main>{children}</Main>;

const Main = styled.main`
  width: 100%;
  max-width: 820px;
  ${device.laptop} {
    width: 100%;
  }
`;

export default Layout;
