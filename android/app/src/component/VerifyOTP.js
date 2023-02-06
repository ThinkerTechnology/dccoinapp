import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from '../styles';
import {response} from 'express';
import {REACT_APP_BASEURL} from '@env';
import AppLoder from '../Loder/AppLoder';
import {useClipboard} from '@react-native-clipboard/clipboard';
const VerifyOTP = props => {
  const {route, navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const {address, email} = route.params;
  const [privat, setPrivat] = useState(['']);
  const [data, setString] = useClipboard();
  const [show, setShow] = useState(true);
  const inputRef = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();

  const [otp1, setOtp1] = useState();
  const [otp2, setOtp2] = useState();
  const [otp3, setOtp3] = useState();
  const [otp4, setOtp4] = useState();

  const fetchCopiedText = async private_key => {
    console.log(private_key, 'privat');
    setString(private_key.toString());
    alert('Private key copied');
  };

  const Submit = async () => {
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
      otp: abcd,
    });

    var requestOptions = {
      method: 'POST',
      body: raw,
      headers: myHeaders,
      redirect: 'follow',
    };
    console.log('hyyy', REACT_APP_BASEURL);
    setIsLoading(true);
    fetch(`${REACT_APP_BASEURL}verifyOPT`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result, 'result');
        // return
        setIsLoading(false);
        if (result.message == 'Invalid OTP') {
          alert('Invalid OTP');
        } else if (result.message == 'OTP Verified') {
          console.log(email, 'hyyy');

          var myHeaders = new Headers();
          myHeaders.append(
            'Authorization',
            'Bearer mkey-clcekabz6qu3uktis2s6g679n',
          );
          myHeaders.append('Content-Type', 'application/json');

          var raw = JSON.stringify({
            email: email,
            address: address,
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };

          fetch(`${REACT_APP_BASEURL}fetchPrivate`, requestOptions)
            .then(response => response.json())
            .then(result => {
              if (result.message == 'No Data Found!') {
                alert('No Data Found!');
              } else {
                console.log(result.result[0].private_key, 'private_key');
                setPrivat(result.result);
                setShow(false);
              }
              // setPrivat('');
            })
            .catch(error => console.log('error', error));
        } else if (result.message == 'Verification falied') {
          alert('Verification falied');
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
          height: '100%',
          paddingHorizontal: 15,
          justifyContent: 'center',
        }}>
        {show && (
          <ScrollView>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 80,
                marginTop: 50,
              }}>
              <Image
                source={require('../image/DC-Logo.png')}
                style={{
                  height: 150,
                  width: 190,
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
                  fontWeight: '500',
                  // marginVertical: 10,
                  padding: 5,
                }}>
                Enter the code sent to
              </Text>
              <Text
                style={{
                  color: '#0D6896',
                  fontSize: 15,
                  fontWeight: '500',
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
                  placeholder={'*'}
                  placeholderTextColor="#D6D6D6"
                  style={styles.inputPas}
                  keyboardType="numeric"
                  maxLength={1}
                  onKeyPress={e => {
                    if (e.nativeEvent.key === 'Backspace') {
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
                  maxLength={1}
                  onKeyPress={e => {
                    if (e.nativeEvent.key === 'Backspace') {
                      inputRef.current.focus();
                    }
                  }}
                  onChangeText={e => {
                    setOtp2(e);
                    if (e.length) inputRef3?.current?.focus();
                  }}
                  ref={inputRef2}
                />
                <TextInput
                  keyboardType="numeric"
                  placeholder={'*'}
                  placeholderTextColor="#D6D6D6"
                  style={styles.inputPas}
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
                />
                <TextInput
                  keyboardType="numeric"
                  placeholder={'*'}
                  placeholderTextColor="#D6D6D6"
                  style={styles.inputPas}
                  maxLength={1}
                  onKeyPress={e => {
                    if (e.nativeEvent.key === 'Backspace') {
                      inputRef3.current.focus();
                    }
                  }}
                  onChangeText={e => {
                    setOtp4(e);
                    if (e.length) inputRef4?.current?.focus();
                  }}
                  ref={inputRef4}
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
            </View>
          </ScrollView>
        )}

        {show == false &&
          privat.length > 0 &&
          privat.map((ele, idx) => (
            <View key={idx}>

              <View>
                <Image
                  source={require('../image/key1.png')}
                  style={{
                    height: 340,
                    width: '100%',
                  }}
                />
              </View>

              <View style={{alignItems: 'center', marginVertical: 20}}>
                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 25}}>
                  Show Private Keys
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 'bold',
                    textAlign:'center',
                    fontSize:15,
                    paddingBottom:10,
                    marginHorizontal: 10,
                  }}>
                  This is your private key <Text style={{color:'#0D6896', fontSize:18, fontWeight:'bold'}}> (click to copy) </Text>
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.8}
                onPress={() => fetchCopiedText(ele.private_key)}>
                <View
                  style={{
                    backgroundColor: '#0D6896',
                 
                    borderRadius: 15,
                    padding: 15,
                    marginVertical: 5, 
                  }}>
                  <Text
                    style={{color: '#fff', fontWeight: '500', lineHeight:20, textAlign:'center'}}
                    value={ele.private_key}>
                    {ele.private_key}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}

        {isLoading && <AppLoder />}
      </View>
    </>
  );
};

export default VerifyOTP;
