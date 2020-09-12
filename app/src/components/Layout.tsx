import React from 'react';
import styled from 'styled-components';

import { device } from '../../share/media-query';

const Layout: React.FC = ({ children }) => <Main>{children}</Main>;

const Main = styled.main`
  width: 740px;
  ${device.laptop} {
    width: 100%;
  }
`;

export default Layout;
