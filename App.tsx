import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
//form validation with yup
import * as yup from 'yup';

import { useState } from 'react';

export default function App() {
  const [password, setPassword] = useState<string>('');
  const [isPwGenerated, setIsPwGenerated] = useState<boolean>(false);
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [numbers, useNumbers] = useState<boolean>(false);
  const [symbols, useSymbols] = useState<boolean>(false);

  const generatePasswordString = (passwordLength: number) => {};

  const createPassword = (characters: string, passwordLength: number) => {};

  const resetPasswordState = () => {};

  const PasswordSchema = yup.object().shape({
    passwordLength: yup
      .number()
      .min(4, 'Should be minimum of 4 characters.')
      .max(16, 'Should be maximum of 16 characters')
      .required(),
  });

  return (
    <View>
      <Text>App</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
