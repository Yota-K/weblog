import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

// adsbygoogle の型定義
// MEMO: typeにするとエラーが起きた
declare global {
  interface Window {
    adsbygoogle?: { [key: string]: unknown }[];
  }
}

const GoogleAdsense: React.FC = () => {
  const { asPath } = useRouter();

  // asPathに変化があった（ページ遷移したとき）に window.adsbygoogle.push({}) するようにする
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, [asPath]);

  // keyを指定しないと、既にイベントを適用している旨のエラーがでてしまう。
  return (
    <AdsenseDiv key={asPath}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1412340494644518"
        data-ad-slot="6911596626"
        data-ad-format="auto"
      ></ins>
    </AdsenseDiv>
  );
};

const AdsenseDiv = styled.div`
  margin-bottom: 30px;
`;

export default GoogleAdsense;
