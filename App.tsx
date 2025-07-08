import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
//form validation with yup
import * as yup from 'yup';

import { useState } from 'react';
import { Formik } from 'formik';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

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
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.mainTitle}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log('values', values);
              generatePasswordString(+values.passwordLength); //TODO
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              isValid,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                  />
                </View>

                {/* Include LowerCase */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowercase</Text>
                  <BouncyCheckbox
                    isChecked={lowercase}
                    onPress={() => setLowercase(!lowercase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    isChecked={uppercase}
                    onPress={() => setUppercase(!uppercase)}
                    fillColor="#FED85D"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#FC80A5"
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 45,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    // alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
