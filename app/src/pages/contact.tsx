import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { NextPage } from 'next';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';

import { config } from '../../config/app';

import { colorObj } from '../../share/variables';
import { device } from '../../share/media-query';
import { contactApiEndpoint } from '../../utils/switch-contact-api';

import Breadcrumb from '../components/Breadcrumb';
import Head from '../components/Head';
import Layout from '../components/Layout';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const Contact: NextPage = () => {
  const { siteTitle } = config.siteInfo;
  const pageTitle = 'お問い合わせ';
  const title = `${siteTitle}｜${pageTitle}`;

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [sendMessage, setSendMessage] = useState('');
  const [apiEndPoint, setApiEndPoint] = useState('');

  const { register, watch, formState, handleSubmit, reset } = useForm<FormValues>({
    // バリデーションが実行されるタイミング
    mode: 'onSubmit',
    // 再度バリデーションを実行するタイミング
    // onChangeの場合は、入力の度にバリデーションが実行される
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    }
  });

  // フォームに文字が入力されていない時は送信ボタンにdisabledを付与する
  const watchFields = watch(['name', 'email', 'message']);
  const isDisabled = watchFields.every((value) => value === '')

  useEffect(() => {
    // windowオブジェクトが存在する時のみAPIのエンドポイントを取得
    if (window) setApiEndPoint(contactApiEndpoint());
  }, []);

  const processing = useRef(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // 処理中なら非同期処理せずに抜ける
      if (processing.current) return;

      // 処理中フラグを上げる
      processing.current = true;

      // undefinedの可能性があるとエラーが出たので
      if (!executeRecaptcha) return;

      const reCaptchaToken = await executeRecaptcha('contactPage');

      const res = await fetch(apiEndPoint, {
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

      if (!res.ok) throw Error(res.statusText);

      setSendMessage('メールの送信に成功しました');

      reset();
    } catch (er) {
      console.error(er);

      setSendMessage('メールの送信に失敗しました');
    }

    setTimeout(() => {
      // 処理中のフラグを下げる
      processing.current = false;
    }, 5000);
  };

  return (
    <Layout>
      <Head title={title} />
      <Breadcrumb pageTitle={pageTitle} />
      <h1>{pageTitle}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormP>
          <FormLabel htmlFor="name">お名前</FormLabel>
          <Input
            type="text"
            placeholder="お名前"
            {...register('name', { required: true })}
          />
          {formState.errors.name?.type === 'required' && (
            <ValidationMessage>お名前を入力してください</ValidationMessage>
          )}
        </FormP>
        <FormP>
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <Input
            type="email"
            placeholder="test@hoge.com"
            {...register('email', {
              pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
              required: true,
            })}
          />
          {formState.errors.email?.type === 'pattern' && (
            <ValidationMessage>正しいメールアドレスを入力してください</ValidationMessage>
          )}
        </FormP>
        <FormP>
          <FormLabel htmlFor="name">お問い合わせ内容</FormLabel>
          <Textarea
            cols={50}
            rows={10}
            {...register('message', { required: true, minLength: 20,  })}
          ></Textarea>
          {formState.errors.message?.type === 'required' && (
            <ValidationMessage>お問い合わせ内容が入力されていません</ValidationMessage>
          )}
          {formState.errors.message?.type === 'minLength' && (
            <ValidationMessage>お問い合わせ内容は20文字以上で入力してください</ValidationMessage>
          )}
        </FormP>
        <SubmitButton type="submit" disabled={isDisabled}>
          送信
        </SubmitButton>
        {sendMessage !== '' && <SendMessageP>{sendMessage}</SendMessageP>}
      </Form>
    </Layout>
  );
};

const Form = styled.form`
  width: 100%;
  max-width: 700px;
`;

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
  display: inline-block;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
  max-width: 100%;
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
  display: block;
  max-width: 320px;

  ${device.mobileM} {
    width: 90%;
    max-width: initial;
  }
`;

const Textarea = styled.textarea`
  ${FormBaseStyle}
  max-width: 620px;
  resize: none;

  ${device.mobileM} {
    width: 90%;
    max-width: initial;
  }
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
