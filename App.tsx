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
  const [numbers, setNumbers] = useState<boolean>(false);
  const [symbols, setSymbols] = useState<boolean>(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars: string = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars: string = '0123456789';
    const specialChars: string = '!@#$%^&*()_+';

    if (uppercase) {
      characterList += uppercase;
    }

    if (lowercase) {
      characterList += lowercase;
    }

    if (numbers) {
      characterList += numbers;
    }

    if (symbols) {
      characterList += symbols;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPwGenerated(!isPwGenerated);
  };

  const createPassword = (
    characters: string,
    passwordLength: number,
  ): string => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPwGenerated(false);
    setLowercase(true);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
  };

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
