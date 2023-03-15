import React from 'react';
import { NextPage } from 'next';
import { H2 } from '@/share/Heading';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

const Custom404: NextPage = () => {
  return (
    <Layout>
      <Seo title="お探しのページが見つかりませんでした" />
      <H2>404 Not Found</H2>
      <p>お探しのページは一時的にアクセスができない状況にあるか、</p>
      <p>移動または削除された可能性があります。</p>
      <p>URL、ファイル名にタイプミスがないかもご確認ください。</p>
    </Layout>
  );
};

export default Custom404;
