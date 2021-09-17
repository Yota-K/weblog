import { NextComponentType, NextPageContext } from 'next';
import React from 'react';

import { RecordType } from '../../interfaces/record-type';

import { H2 } from '../../share/Heading';

import Seo from '../components/Seo';
import Layout from '../components/Layout';

interface Props {
  statusCode: number;
}

const Error: NextComponentType<NextPageContext, RecordType, Props> = ({ statusCode }) => {
  return (
    <Layout>
      <Seo title={`${statusCode}エラーが発生しました`} />
      <H2>{statusCode} Not Found</H2>
      <p>お探しのページは一時的にアクセスができない状況にあるか、</p>
      <p>移動または削除された可能性があります。</p>
      <p>URL、ファイル名にタイプミスがないかもご確認ください。</p>
    </Layout>
  );
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 400;
  return { statusCode };
};

export default Error;
