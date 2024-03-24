import '@mantine/core/styles.css';

import { Button, Container, Flex, Image, Paper, Text, TextInput } from '@mantine/core';
import type { ChangeEvent, FC } from 'react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { signIn } from '@/redux/slices/authSlice';
import { setPhoneNumber } from '@/redux/slices/userSlice';
import { useAppDispatch } from '@/redux/store';

import iconSteam from '../../../public/steam.svg';
import classes from './LoginForm.module.css';

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [phoneNumber, setNumberPhone] = useState('');

  const getPhoneNumberFromUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNumberPhone(event.currentTarget.value);
  };

  const handlerAuth = useCallback(async () => {
    dispatch(setPhoneNumber(phoneNumber));
    await dispatch(signIn(phoneNumber));
    navigate('/sendSms');
  }, [phoneNumber]);

  const { t } = useTranslation();
  return (
    <Container size={460} my={30} ta="center" mt={250}>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Text>{t('sign')}</Text>
        <TextInput
          label={t('yourPhone')}
          placeholder={t('enterPhone')}
          required
          ta="left"
          onChange={getPhoneNumberFromUserInput}
        />
        <Flex mih={50} gap="sm" justify="center" align="center" direction="column" wrap="wrap">
          <Button
            className={classes.control}
            mt={30}
            radius="lg"
            id="sign-in-button"
            onClick={handlerAuth}>
            {t('sendSms')}
          </Button>
          <Button
            className={classes.control}
            radius="lg"
            leftSection={<Image h={20} w={20} src={iconSteam} />}>
            {t('signSteam')}
          </Button>
        </Flex>
      </Paper>
    </Container>
  );
};

export default LoginForm;
