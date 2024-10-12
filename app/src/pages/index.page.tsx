import { NextPage } from 'next';
import React from 'react';
import { Props, getStaticProps } from './index.hook';

const Home: NextPage<Props> = ({ contents, totalCount }) => {
  return (
    <div>test</div>
  );
};

export default Home;

export { getStaticProps };
