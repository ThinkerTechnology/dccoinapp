import {View, Text, LogBox, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {RNCamera} from 'react-native-camera';
import {Button} from 'react-native-paper';
import {color} from 'react-native-reanimated';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_BASEURL} from '@env';
import AppLoder from '../Loder/AppLoder';

const Scanner = props => {
  const {navigation} = props;

  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });
  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  // console.log(address,"baby")
  const Send = (displayValue) => {
    console.log(displayValue.split(':')[0], 'display');
    if(displayValue.split(':')[0] === "ethereum"){
      props.cSetShow(false);
      props.setReceiverAddresss(displayValue.split(':')[1]);
      // navigation.navigate('SendToken', address);
    }else{
      alert('please scan the valid addresses');
    }
    
  };
  return (
    <>
      {device != null && hasPermission && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          {barcodes.map((barcode, idx) => (
            <TouchableOpacity
            key={idx}
              activeOpacity={0.8}
              onPress={() => Send(barcode.displayValue)}>
              <Text
                key={idx}
                style={{
                  fontSize: 20,
                  color: 'red',
                  fontWeight: 'bold',
                  alignItems: 'center',
                  justifyContent:'center'
                }}>
                {barcode.displayValue}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </>
  );
};

const SendToken = props => {
  const [isLoading, setIsLoading] = useState(false);
  const {route, navigation} = props;
  const {sendToken, sendValue, name, selectedValue} = route.params;

  const [address, setReceiverAddresss] = useState('');
  const [value, setValue] = useState('');
  const [cShow, cSetShow] = useState(false);
  const Send = async () => {
    const Web3 = require('web3');
    const web3 = new Web3('https://rpc.ankr.com/bsc_testnet_chapel');
    let yess = web3.utils.isAddress(address);
    if (yess == false) {
      alert('Please provide valid Receiver address');
      return;
    }
    if (value == 0 || value == undefined || value == '' || value == null) {
      alert('Please Enter a Token value');
      return;
    }
    if (
      sendValue == 0 ||
      sendValue == undefined ||
      sendValue == '' ||
      sendValue == null
    ) {
      alert('Please provide a Token value');
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: await AsyncStorage.getItem('email'),
      address: selectedValue,
      tokenAddress: sendToken,
      receiverAddress: address,
      amount: value,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setIsLoading(true)
    fetch(`${REACT_APP_BASEURL}sendToken`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result,"result");
        setIsLoading(false)
        if (result.message === 'No User Found!') {
          alert('No User Found');
        } else if (
          result.message === 'You dont have enough funds for transfer'
        ) {
          alert('You dont have enough funds for transfer');
        } else if (result.message === 'Transaction Successfull') {
          setReceiverAddresss('');
          setValue('');
          alert('Transaction Successfull');
        } else if (result.message === 'Transaction Unsuccessfull') {
          alert('Transaction Unsuccessfull');
        } else if(result.message.includes('execution reverted: ')){
          alert('Something went wrong in token');
        }

        if(result.errors){
          alert(result.errors[0].msg);
        }
     
      })
      .catch(error => {
        setIsLoading(false)
        alert(error.message);
        console.log('error', error)
      });
  };

  return cShow ? (
    <Scanner cSetShow={cSetShow} setReceiverAddresss={setReceiverAddresss} />
  ) : (
    <View style={{flex: 1, height: '100%', paddingHorizontal: 15}}>
      <View style={{borderRadius: 5, paddingTop: 50, paddingBottom: 10}}>
        <Text style={{color: '#000', fontWeight: '800', fontSize: 18}}>
          Send token
        </Text>
      </View>
      <View
        style={{
          borderColor: '#E6E2C3',
          borderWidth: 1,
          borderRadius: 15,
          padding: 15,
          marginVertical: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{paddingVertical: 10}}>
            <Text style={{color: '#000', fontWeight: 'bold'}}>Address</Text>
          </View>
          <View
            style={{
              backgroundColor: '#0D6896',
              width: '10%',
              height: 30,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => cSetShow(!cShow)}>
              <Ionicons name="scan-outline" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            // flex: 1,
          }}>
          <TextInput
        
            value={selectedValue}
            editable={false}
            // onChangeText={text => setSelectedAddress(text)}
            placeholder="0xeb"
            placeholderTextColor="#000"
            style={{
              paddingHorizontal: 10,
              paddingVertical: 15,
              color: '#000',
              borderColor: '#a3a3a3a8',
              borderWidth: 0.5,
              borderRadius: 5,
              height: '100%',
              width: '100%',
            }}
          />
        </View>
        <View style={{paddingVertical: 10}}>
          <Text style={{color: '#000', fontWeight: 'bold'}}>
            Receiver Address
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <TextInput
            value={address}
            onChangeText={text => setReceiverAddresss(text)}
            defaultValue={address}
            placeholder="000000"
            placeholderTextColor="#86A3B8"
            style={{
              paddingHorizontal: 10,
              paddingVertical: 15,
              color: '#000',
              borderColor: '#a3a3a3a8',
              borderWidth: 0.5,
              borderRadius: 5,
              height: '100%',
              width: '100%',
            }}
          />
        </View>
        <View style={{paddingVertical: 10}}>
          <Text style={{color: '#000', fontWeight: 'bold'}}>No. of Token</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
              flex: 1,
            }}>
            <TextInput
              value={value}
              onChangeText={text => setValue(text)}
              placeholder="10"
              placeholderTextColor="#86A3B8"
              style={{
                paddingHorizontal: 10,
                paddingVertical: 15,
                color: '#000',
                borderColor: '#a3a3a3a8',
                borderWidth: 0.5,
                borderRadius: 5,
                width: '93%',
              }}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              backgroundColor: '#0D6896',
              borderRadius: 5,
              marginTop: 2,
              justifyContent: 'center',
              width: '25%',
              height: 55,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                fontWeight: 'bold',
                alignSelf: 'center',
                marginBottom: 6,
              }}>
              {name}
            </Text>
          </View>
        </View>
        <View style={{marginVertical: 30}}>
          <TouchableOpacity
            onPress={() => Send()}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#0D6896',
              borderRadius: 30,
              paddingVertical: 8,
              paddingHorizontal: 8,
              width: '100%',
              borderColor: '#0D6896',
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                fontWeight: 'bold',
                alignSelf: 'center',
                marginBottom: 6,
              }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && <AppLoder/>}
    </View>
    
  );
};

export default SendToken;
