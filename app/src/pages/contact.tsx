import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import { config } from '../../config/app';

import { colorObj } from '../../share/variables';

import Breadcrumb from '../components/Breadcrumb';
import Head from '../components/Head';
import Layout from '../components/Layout';

const Contact: NextPage = () => {
  const { siteTitle } = config.siteInfo;
  const pageTitle = 'お問い合わせ';
  const title = `${siteTitle}｜${pageTitle}`;

  return (
    <Layout>
      <Head title={title} />
      <Breadcrumb pageTitle={pageTitle} />
      <h1>{pageTitle}</h1>
      <FormP>
        <FormLabel htmlFor="name">お名前</FormLabel>
        <Input id="name" type="text" placeholder="お名前" />
      </FormP>
      <FormP>
        <FormLabel htmlFor="email">メール</FormLabel>
        <Input id="email" type="email" placeholder="test@hoge.com" />
      </FormP>
      <FormP>
        <FormLabel htmlFor="name">お問い合わせ内容</FormLabel>
        <Textarea cols={50} rows={10}></Textarea>
      </FormP>
      <SubmitButton type="submit">送信</SubmitButton>
    </Layout>
  );
};

const FormP = styled.p`
  margin: 20px 0;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #2b2030;
`;

const FormBaseStyle = `
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  background: #edf2f7;
  border: none;
  font-size: 16px;
  padding: 8px;
  width: 100%;
`;

const Input = styled.input`
  ${FormBaseStyle}
  max-width: 320px;
`;

const Textarea = styled.textarea`
  ${FormBaseStyle}
  max-width: 620px;
`;

const SubmitButton = styled.button`
  background: ${colorObj.baseBlue};
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  border-radius: 3px;
  border: none;
  width: 100%;
  max-width: 140px;
`;

export default Contact;
