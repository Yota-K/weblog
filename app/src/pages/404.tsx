import React from 'react';

import { H2 } from '../../share/Heading';

import Head from '../components/Head';
import Layout from '../components/Layout';

const Custom404: React.FC = () => {
  return (
    <Layout>
      <Head title="お探しのページが見つかりませんでした" />
      <H2>404 Not Found</H2>
      <p>お探しのページは一時的にアクセスができない状況にあるか、</p>
      <p>移動または削除された可能性があります。</p>
      <p>URL、ファイル名にタイプミスがないかもご確認ください。</p>
    </Layout>
  );
};

export default Custom404;
