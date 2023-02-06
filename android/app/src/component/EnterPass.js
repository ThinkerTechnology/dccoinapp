import {
  View,
  Text,
  ScrollView,
  Pressable,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from '../styles';
import Home from '../screen/Home';
import {REACT_APP_BASEURL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoder from '../Loder/AppLoder';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const EnterPass = props => {
  const {route, navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const {email, kyc_verify} = route.params;
  // console.log({email,kyc_verify},"{email,kyc_verify}");
  const inputRef = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();

  const [otp, setOtp] = useState();
  const [otp1, setOtp1] = useState();
  const [otp2, setOtp2] = useState();
  const [otp3, setOtp3] = useState();
  const [otp4, setOtp4] = useState();

  useEffect(() => {
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 10000);
  }, []);

  const Resend = async () => {
    // alert('resend');
    var myHeaders = new Headers();
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
    setIsLoading(true);
    let result = await fetch(`${REACT_APP_BASEURL}resend`, requestOptions);
    result = await result.json();
    console.log(result, 'result');
    // return
    setIsLoading(false);
    if (result.message !== 'Enter OTP') {
      alert('Login failed');
    } else {
      console.log(result);
      alert('Enter OTP');
    }
  };
  // const Home = () => {

  //   navigation.push('Login');
  // };
  const Submit = async () => {
    console.log('nishu');
    if (otp1 == '' || otp2 == '' || otp3 == '' || otp4 == '') {
      alert('please provide a OTP');
      return;
    }

    if (
      otp1 == undefined ||
      otp2 == undefined ||
      otp3 == undefined ||
      otp4 == undefined
    ) {
      alert('please provide a OTP');
      return;
    }
    // alert('hyyy');
    console.log(otp1, otp2, otp3, otp4);
    let abcd = otp1 + '' + otp2 + '' + otp3 + '' + otp4;
    console.log(abcd, 'otp');

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      // email: 'testingail2005@gmail.com',
      email: email,
      otp: `${abcd}`,
    });

    var requestOptions = {
      method: 'POST',
      body: raw,
      headers: myHeaders,
      redirect: 'follow',
    };
    console.log('hyyy', REACT_APP_BASEURL);
    setIsLoading(true);
    let result = await fetch(`${REACT_APP_BASEURL}verifyOPT`, requestOptions);
    result = await result.json();

    console.log(result, 'sonu');
    // return
    setIsLoading(false);
    if (result.message == 'Invalid email address') {
      alert('Invalid email address');
    } else if (result.message == 'OTP Verified') {
      console.log(email, 'hyyy');
      console.log(kyc_verify, 'kyc_verify');

      if (kyc_verify == 1) {
        await AsyncStorage.setItem('email', email);
        props.setIsLoggedIn(true);
        navigation.push('TabBar');
      } else {
        await AsyncStorage.setItem('email', email);
        navigation.push('KYC', {email});
      }
    } else {
      console.log(result);
      alert('Verification falied');
    }
  };

  return (
    <>
      <View
        style={{
          // flex: 1,
          // alignItems: 'center',
          // height: '100%',
          // paddingHorizontal: 15,
          // justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 15,
          justifyContent: 'center',
          height: responsiveHeight(100), // 50% of window height
          width: responsiveWidth(100),
        }}>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              marginTop: responsiveHeight(10),
              marginBottom: responsiveHeight(13),
            }}>
            <Image
              source={require('../image/DC-Logo.png')}
              style={{
                // height: 180,
                // width: 250,

                width: responsiveWidth(50),
                height: responsiveHeight(20),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              // marginTop: responsiveWidth(-5),
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: responsiveFontSize(2),
                fontWeight: '500',
                padding: responsiveWidth(1),
              }}>
              Enter the code sent to
            </Text>
            <Text
              style={{
                color: '#0D6896',
                fontWeight: '600',
                fontSize: responsiveFontSize(2),
                paddingBottom: responsiveWidth(5),
              }}>
              {/* {AsyncStorage.getItem('email')} */}
              {email}
            </Text>
          </View>

          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // marginTop: 10,
                marginTop: responsiveWidth(1),
                marginBottom: responsiveHeight(1),
              }}>
              <TextInput
                placeholder={'*'}
                placeholderTextColor="#D6D6D6"
                style={styles.inputPas}
                keyboardType="numeric"
                // secureTextEntry={true}
                maxLength={1}
                onKeyPress={e => {
                  if (e.nativeEvent.key === 'Backspace') {
                    // console.log("backspace");
                    inputRef.current.focus();
                  }
                }}
                onChangeText={e => {
                  setOtp1(e);
                  if (e.length) inputRef2?.current?.focus();
                }}
                ref={inputRef}
              />
              <TextInput
                keyboardType="numeric"
                placeholder={'*'}
                placeholderTextColor="#D6D6D6"
                style={styles.inputPas}
                // secureTextEntry={true}
                maxLength={1}
                onKeyPress={e => {
                  if (e.nativeEvent.key === 'Backspace') {
                    // console.log("backspace");
                    inputRef.current.focus();
                  }
                }}
                onChangeText={e => {
                  setOtp2(e);
                  if (e.length) inputRef3?.current?.focus();
                }}
                ref={inputRef2}

                // onChangeText={usernameHandeler}
              />
              <TextInput
                keyboardType="numeric"
                placeholder={'*'}
                placeholderTextColor="#D6D6D6"
                style={styles.inputPas}
                // secureTextEntry={true}
                maxLength={1}
                onKeyPress={e => {
                  if (e.nativeEvent.key === 'Backspace') {
                    inputRef2.current.focus();
                  }
                }}
                onChangeText={e => {
                  setOtp3(e);
                  if (e.length) inputRef4?.current?.focus();
                }}
                ref={inputRef3}

                // onChangeText={usernameHandeler}
              />
              <TextInput
                keyboardType="numeric"
                placeholder={'*'}
                placeholderTextColor="#D6D6D6"
                style={styles.inputPas}
                // secureTextEntry={true}
                maxLength={1}
                onKeyPress={e => {
                  if (e.nativeEvent.key === 'Backspace') {
                    // console.log("backspace");
                    inputRef3.current.focus();
                  }
                }}
                onChangeText={e => {
                  setOtp4(e);
                  if (e.length) inputRef4?.current?.focus();
                }}
                ref={inputRef4}
                // onChangeText={usernameHandeler}
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
                  width: responsiveWidth(90),
                  marginTop: responsiveWidth(1),
                  // marginBottom: responsiveWidth(2),
                }}
                onPress={() => Submit()}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#fff',
                    fontWeight: '500',
                    alignSelf: 'center',
                    marginBottom: 6,
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* {isLoading && <AppLoder/>} */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Pressable>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  // marginBottom: responsiveWidth(3),
                  color: '#000',
                }}
                // onPress={() => Home()}
              >
                Didn't receive the code?
              </Text>
            </Pressable>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={
                {
                  // backgroundColor: '#dee5f5',
                  // borderRadius: 12,
                  // paddingVertical: 8,
                  // paddingHorizontal: 8,
                  // marginBottom: 10,
                  // marginTop: 10,
                  // width: 150,
                  // borderColor: '#000',
                  // borderWidth: 1,
                }
              }
              onPress={() => Resend()}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#0D6896',
                  // marginBottom: responsiveWidth(1.5),
                  alignItems: 'center',
                }}>
                {' '}
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading && <AppLoder />}
      </View>
    </>
  );
};

export default EnterPass;
