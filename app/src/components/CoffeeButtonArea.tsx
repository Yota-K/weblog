import React from 'react';
import styled from 'styled-components';

const CoffeeButtonArea: React.FC<{ isPost?: boolean }> = ({ isPost }) => {
  // next/imageコンポーネントを使うと403エラーが発生して画像の取得ができなかったので、imgタグを使用する
  return (
    <CoffeeButtonDiv>
      <ButtonLink href="https://www.buymeacoffee.com/karukichi" target="_blank" rel="noreferrer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          height="41"
          width="174"
        />
        {/* eslint-enable-next-line @next/next/no-img-element */}
      </ButtonLink>
      <p>
        <small>
          もしこの{isPost ? '記事' : 'ブログ'}が役に立ったなら、こちらから ☕ を一杯支援いただけると喜びます
        </small>
      </p>
    </CoffeeButtonDiv>
  );
};

const CoffeeButtonDiv = styled.div`
  margin-top: 30px;
  p {
    font-size: 12px;
  }
`;

const ButtonLink = styled.a`
  display: inline-block;
`;

export default CoffeeButtonArea;
