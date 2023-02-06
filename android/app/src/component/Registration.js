import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native'; // import { SafeAreaView } from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {REACT_APP_BASEURL} from '@env';
import {styles} from '../styles';
import Refcode from './Refcode';
import AppLoder from '../Loder/AppLoder';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import AppLoder from './AppLoder';
const Registration = props => {
  const {navigation} = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const register = async () => {
    if (email == '') {
      alert('please provide a email');
      return;
    }

    if (!email || EMAIL_REGEX.test(email) == false) {
      alert('please provide a valid email');
      return;
    }

    var myHeaders = new Headers();
    // AsyncStorage.setItem("email", email);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: email,
      refferedBy: name,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(`${REACT_APP_BASEURL}register`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setIsLoading(false);
        if (result.message !== 'The E-mail already in use') {
          // props.setIsLoggedIn(true);

          var myHeaderss = new Headers();

          myHeaderss.append('Content-Type', 'application/json');

          var raws = JSON.stringify({
            email: email,
          });

          var requestOptionss = {
            method: 'POST',
            headers: myHeaderss,
            body: raws,
            redirect: 'follow',
          };

          fetch(`${REACT_APP_BASEURL}fetchuser`, requestOptionss)
            .then(response => response.json())
            .then(async resultt => {
              console.log(resultt, 'shubham');
              console.log(resultt.result[0].email);
              if (resultt.message !== 'Enter OTP') {
                // await AsyncStorage.setItem("email", resultt.result[0].email);
                await AsyncStorage.setItem(
                  'private_key',
                  resultt.result[0].private_key,
                );
                await AsyncStorage.setItem(
                  'refferalCode',
                  resultt.result[0].refferalCode,
                );
                await AsyncStorage.setItem(
                  'wallet_address',
                  resultt.result[0].wallet_address,
                );
                // console.log(await AsyncStorage.getItem("email"));
                // console.log(await AsyncStorage.getItem("private_key"));
                // console.log(await AsyncStorage.getItem("refferalCode"));
                // console.log(await AsyncStorage.getItem("wallet_address"));
                navigation.push('RegOtp', {email});
              } else {
                alert('Enter OTP');
              }
            })
            .catch(error => {
              setIsLoading(false);
              console.log('error', error);
            });
        } else {
          console.log(result);
          alert('The E-mail already in use');
        }
      })
      .catch(error => {
        setIsLoading(false);
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
          width: responsiveWidth(100),
        }}>
        {/* <ScrollView
                    contentContainerStyle={{
                        paddingTop: 30,Invalid Otp
                        paddingHorizontal: 20,
                        flex:1,
                        alignItems:'center',
                        width:'100%',

                    }}
                > */}
        <View
          style={{
            // justifyContent: 'center',
            // alignItems: 'center',
            marginBottom: responsiveHeight(13)
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
              style={{
                color: '#000',
                borderColor: '#D2D2D2',
                borderWidth: 1,
                marginTop: responsiveHeight(1),
                marginBottom: responsiveHeight(2),
                borderRadius: responsiveWidth(10),
                width: responsiveWidth(90),
                paddingHorizontal:responsiveWidth(5),
                paddingVertical: responsiveWidth(3),
              }}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: '#000'}}>
              {' '}
              {name && 'Your Refferal Code is :' + name}
            </Text>
          </View>

          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: '#0D6896',
                borderRadius:responsiveWidth(10),
                paddingVertical: responsiveWidth(2.5),
                paddingHorizontal: responsiveWidth(2.5),
                marginBottom: responsiveWidth(4),
                width: responsiveWidth(90),
              }}
              onPress={() => register()}>
              <Text
                style={{
                  fontSize:responsiveFontSize(2.2),
                  color: '#fff',
                  fontWeight: '500',
                  alignSelf: 'center',
                  marginBottom:responsiveWidth(1.5),
                  letterSpacing: 0.5,
                }}>
                Registration
              </Text>
            </TouchableOpacity>
          </View>
          {isLoading && <AppLoder />}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Text style={{ fontSize: 20, color: "#000" }} onPress={() => navigation.push("Home")}>
                            Cancel
                        </Text> */}
            <Text
              style={{fontSize: 20, color: '#fff'}}
              // onPress={() => navigation.push('Home')}
            >
              <Refcode setName={setName} name={name} />
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Registration;
