import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {styles} from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {REACT_APP_BASEURL} from '@env';
import AppLoder from '../Loder/AppLoder';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Login = props => {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  // const [text, setText] = useState();
  const login = async () => {
    if (email == '') {
      alert('please provide a email');
      return;
    }

    if (!email || EMAIL_REGEX.test(email) == false) {
      alert('please provide a valid email');
      return;
    }

    var myHeaders = new Headers();
    // asyncStorage start setItem
    // AsyncStorage.setItem('email', email);

    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: email,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    console.log('hyyy', REACT_APP_BASEURL);
    setIsLoading(true);
    fetch(`${REACT_APP_BASEURL}login`, requestOptions)
      .then(response => response.json())
      .then(async result => {
        setIsLoading(false);
        console.log(result, 'result');
        if (typeof result.message === 'object') {
          // props.setIsLoggedIn(true);
          console.log(result.message, 'message');
          console.log(result.message[0].email);

          // await AsyncStorage.setItem('email', result.message[0].email);
          await AsyncStorage.setItem(
            'private_key',
            result.message[0].private_key,
          );
          await AsyncStorage.setItem(
            'kyc_verify',
            result.message[0].kyc_verify.toString(),
          );
          await AsyncStorage.setItem(
            'activityStatus',
            result.message[0].activityStatus.toString(),
          );
          await AsyncStorage.setItem(
            'refferalCode',
            result.message[0].refferalCode,
          );
          await AsyncStorage.setItem(
            'wallet_address',
            result.message[0].wallet_address,
          );
          console.log(await AsyncStorage.getItem('activityStatus'), 'kaju');
          // console.log(await AsyncStorage.getItem('email'));
          console.log(await AsyncStorage.getItem('private_key'));
          console.log(await AsyncStorage.getItem('refferalCode'));
          console.log(await AsyncStorage.getItem('wallet_address'));
          navigation.push('EnterPass', {
            email,
            kyc_verify: result.message[0].kyc_verify,
          });
        } else {
          console.log(result);
          alert("You don't have an account please register");
        }
      })
      .catch(error => {
        setIsLoading(false);
        alert(error);
        console.log('error', error);
      });
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 15,
          justifyContent: 'center',
          height: responsiveHeight(100), // 50% of window height
          width: responsiveWidth(100), // 50% of window width
           

        }}>
        {/* <ScrollView
                    contentContainerStyle={
                        {
                            // paddingTop: 30,
                        }
                    }
                > */}

        <View
          style={{
            marginBottom: responsiveHeight(13),
          }}>
          <Image
            source={require('../image/DC-Logo.png')}
            style={{
              width: responsiveWidth(50),
              height: responsiveHeight(20),
            }}
          />
        </View>
        <View
          style={{
            // width: '100%',
          }}>
          <View>
            <TextInput
              placeholder="Enter Email ID"
              placeholderTextColor="#6D6D6D"
              autoCapitalize="none"
              style={{
                color: '#000',
                borderColor: '#0D6896',
                borderWidth: 1,
                marginTop: responsiveHeight(1),
                marginBottom: responsiveHeight(5),
                borderRadius: responsiveWidth(10),
                width: responsiveWidth(90),
                paddingHorizontal:responsiveWidth(5),
                paddingVertical: responsiveWidth(3),
              }}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: '#0D6896',
                borderRadius: responsiveWidth(10),
                paddingVertical: responsiveWidth(2.5),
                paddingHorizontal: responsiveWidth(2.5),
                marginBottom: responsiveWidth(5),
                width: responsiveWidth(90),
              }}
              onPress={() => login()}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  color: '#fff',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginBottom: responsiveWidth(1.5)
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </ScrollView> */}

        {/* <View>
          <Pressable>
            <Text
              style={{fontSize: 20, marginBottom: 10, color: '#fff'}}
              onPress={() => navigation.push('Home')}>
              Cancel
            </Text>
          </Pressable>
        </View> */}
      </View>
      {isLoading && <AppLoder />}
    </>
  );
};

export default Login;
