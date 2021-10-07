import { NextComponentType, NextPageContext } from 'next';
import React from 'react';

import { RecordType } from '@/interfaces/record-type';

import { H2 } from '@/share/Heading';

import Seo from '@/components/Seo';
import Layout from '@/components/Layout';

interface Props {
  statusCode: number;
}

const Error: NextComponentType<NextPageContext, RecordType, Props> = ({ statusCode }) => {
  return (
    <Layout>
      <Seo title={`${statusCode}エラーが発生しました`} />
      <H2>{statusCode} Not Found</H2>
      <p>サーバで何らかのエラーが発生しました。</p>
      <p>恐れ入りますが、時間をおいて再度アクセスしてください。</p>
    </Layout>
  );
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 400;
  return { statusCode };
};

export default Error;
