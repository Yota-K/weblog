import React from 'react';
import { NextComponentType, NextPageContext } from "next";

import Head from '../components/Head';
import Layout from '../components/Layout';
import { H2 } from '../styled-components/atoms/Heading';

interface Props {
    statusCode: number;
}

const Error: NextComponentType<NextPageContext, {}, Props> = ({ statusCode }) => {
    const convertString = statusCode.toFixed();
    return (
        <Layout>
            <Head title={`${convertString}エラーが発生しました`} />
            <H2>{convertString}: Not Found</H2>
            <p>お探しのページは一時的にアクセスができない状況にあるか、</p>
            <p>移動または削除された可能性があります。</p>
            <p>URL、ファイル名にタイプミスがないかもご確認ください。</p>
        </Layout>
    )
}

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 400;
    return {statusCode};
}

export default Error;
