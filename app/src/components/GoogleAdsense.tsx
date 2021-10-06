import React from 'react';
import styled from 'styled-components';

import { Adsense } from '@ctrl/react-adsense';

const GoogleAdsense: React.FC = () => {
  return (
    <AdsenseDiv>
      <Adsense client="ca-pub-1412340494644518" slot="6911596626" style={{ display: 'block' }} format="auto" />
    </AdsenseDiv>
  );
};

const AdsenseDiv = styled.div`
  margin-bottom: 30px;
`;

export default GoogleAdsense;
