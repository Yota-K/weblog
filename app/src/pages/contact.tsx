import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { NextPage } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';

import { config } from '../../config/app';

import { colorObj } from '../../share/variables';
import { contactApiEndpoint } from '../../utils/switch-contact-api';

import Breadcrumb from '../components/Breadcrumb';
import Head from '../components/Head';
import Layout from '../components/Layout';

interface FormContent {
  name: string;
  email: string;
  message: string;
}

const Contact: NextPage = () => {
  const { siteTitle } = config.siteInfo;
  const pageTitle = 'お問い合わせ';
  const title = `${siteTitle}｜${pageTitle}`;
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { register, errors, handleSubmit, reset } = useForm<FormContent>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [sendMessage, setSendMessage] = useState('');

  const isDisabled = !name || !email || !message;

  const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  const handleEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  };

  const handleMessageChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(target.value);
  };

  const onSubmit: SubmitHandler<FormContent> = async (data) => {
    try {
      // 実行環境ごとのAPIのエンドポイントを取得
      const apiEndpoint = contactApiEndpoint();

      const reCaptchaToken = await executeRecaptcha('contactPage');

      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          token: reCaptchaToken,
        }),
      });

      if (!res.ok) {
        throw Error(res.statusText);
      }

      setSendMessage('メールの送信に成功しました');

      reset();
    } catch (er) {
      console.error(er);

      setSendMessage('メールの送信に失敗しました');
    }
  };

  return (
    <Layout>
      <Head title={title} />
      <Breadcrumb pageTitle={pageTitle} />
      <h1>{pageTitle}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormP>
          <FormLabel htmlFor="name">お名前</FormLabel>
          <Input
            name="name"
            type="text"
            placeholder="お名前"
            onChange={handleNameChange}
            ref={register({ required: true })}
          />
        </FormP>
        <FormP>
          <FormLabel htmlFor="email">メール</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="test@hoge.com"
            onChange={handleEmailChange}
            ref={register({
              pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
              required: true,
            })}
          />
          {errors.email?.type === 'pattern' && (
            <ValidationMessage>正しいメールアドレスを入力してください</ValidationMessage>
          )}
        </FormP>
        <FormP>
          <FormLabel htmlFor="name">お問い合わせ内容</FormLabel>
          <Textarea
            name="message"
            cols={50}
            rows={10}
            onChange={handleMessageChange}
            ref={register({ minLength: 20, required: true })}
          ></Textarea>
          {/* バリデーションメッセージが表示された時に下にがくんと下がる */}
          {errors.message?.type === 'minLength' && (
            <ValidationMessage>お問い合わせ内容は20文字以上で入力してください</ValidationMessage>
          )}
        </FormP>
        <SubmitButton type="submit" disabled={isDisabled}>
          送信
        </SubmitButton>
        {sendMessage !== '' && <SendMessageP>{sendMessage}</SendMessageP>}
      </form>
    </Layout>
  );
};

const FormP = styled.p`
  margin: 20px 0;
`;

const ValidationMessage = styled.span`
  display: block;
  padding-top: 8px;
  color: red;
  font-weight: bold;
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

  &[type='submit']:disabled {
    background: #ddd;
  }
`;

const SendMessageP = styled.p`
  margin-top: 16px;
  color: red;
  font-weight: bold;
`;

export default Contact;
