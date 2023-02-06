import {
  View,
  Text,
  ScrollView,
  Pressable,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_BASEURL} from '@env';
import AppLoder from '../Loder/AppLoder';

const RegOtp = props => {
  const {route,navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const {email} = route.params;
  const inputRef = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();

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
    setIsLoading(true)
    let result = await fetch(`${REACT_APP_BASEURL}resend`, requestOptions);
    result = await result.json();
    console.log(result, 'result');
    // return
    setIsLoading(false)
    if (result.message == 'Enter OTP') {
    
      alert('check your email');
    } else {
      console.log(result);
      alert('Login failed');
    }
  };

  const Submit = async () => {
    // props.setIsLoggedIn(true);
    // navigation.push('TabBar');

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
    setIsLoading(true)
 
    let result = await fetch(`${REACT_APP_BASEURL}verifyOPT`, requestOptions);
    result = await result.json();
 console.log(result,"sonu bhai ");
    // return
    setIsLoading(false);
    if (result.message == 'Invalid OTP') {
      alert('Invalid OTP');
    } 
    else if (result.message == 'OTP Verified') {
      console.log(email, 'hyyy');
      // await AsyncStorage.setItem('email', email);
      // props.setIsLoggedIn(true);
      navigation.push('RegKyc',{email});
    } else {
      console.log(result);
      alert('Verification falied');
    }
  };
  const Home = () => {
    // props.setIsLoggedIn(true)
    navigation.push('Registration');
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          height: '100%',
          paddingHorizontal: 15,
          justifyContent: 'center',
        }}>
        {/* <ScrollView
          contentContainerStyle={{
            paddingTop: 30,
           
          }}> */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 100,
          }}>
          <Image
            source={require('../image/DC-Logo.png')}
            style={{
              height: 180,
              width: 250,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 15,
              // marginVertical: 10,
              padding: 5,
            }}>
            Enter the code sent to
          </Text>
          <Text
            style={{
              color: '#0D6896',
              fontSize: 15,
              // marginVertical: 10,
              // padding: 10,
            }}>
            {email}
          </Text>
        </View>

        <View style={{width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <TextInput
              keyboardType="numeric"
              placeholder={'*'}
              placeholderTextColor="#D6D6D6"
              style={styles.inputPas}
              // secureTextEntry={true}
              maxLength={1}
              ref={inputRef}
              onKeyPress={e => {
                if (e.nativeEvent.key === 'Backspace') {
                  // console.log("backspace");
                  inputRef.current.focus();
                }
              }}
              onChangeText={e => {
                // console.log(e);
                setOtp1(e);
                if (e.length) inputRef2?.current?.focus();
              }}
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
                // console.log(e);
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
                  // console.log("backspace");
                  inputRef2.current.focus();
                }
              }}
              onChangeText={e => {
                // console.log(e);
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
                // console.log(e);
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
                borderRadius: 50,
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginBottom: 15,
                width: '100%',
              }}
              onPress={() => Submit()}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  fontWeight: 'normal',
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}>
                submit
              </Text>
            </TouchableOpacity>
          </View>
          {isLoading && <AppLoder/>}
        </View>
        {/* </ScrollView> */}
        {/* {isLoading && <AppLoder/>} */}
        <View
          style={{
           
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable>
            <Text
              style={{fontSize: 12, marginBottom: 10, color: '#000'}}
              // onPress={() => Home()}
            >
              Didn't receive the code?
            </Text>
          </Pressable>
          <View>
          <TouchableOpacity activeOpacity={0.8}
            style={
              {
                // backgroundColor: '#0D6896',
                // borderRadius: 12,
                // paddingVertical: 8,
                // paddingHorizontal: 8,
                // width: '100%',
                // borderColor: '#0D6896',
                // borderWidth: 1,
                // flex: 1,
                // justifyContent: 'center',
              }
            }
            onPress={() => Resend()}>
            <Text
              style={{
                fontSize: 12,
                color: '#0D6896',
                marginBottom: 10,
                alignItems: 'center',
              }}>
              {' '}
              Resend
            </Text>
          </TouchableOpacity>
        </View>
        </View>
        
      </View>
    </>
  );
};

export default RegOtp;
