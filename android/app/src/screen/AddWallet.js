import {View, Text, TextInput, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {REACT_APP_BASEURL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoder from '../Loder/AppLoder';

const AddWallet = () => {
  const [privat, setPrivat] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const importPrivate = async () => {
    if (privat == '' || privat == undefined || privat == null) {
      alert('Please Enter Private key');
      return;
    }
    const Web3 = require('web3');
    const web3 = new Web3('https://rpc.ankr.com/bsc_testnet_chapel');
    let yes = web3.utils.isHex(privat, 32);
    if(yes == false) {
      alert('Please provide valid Private Key');
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: await AsyncStorage.getItem('email'),
      key: privat,
    });
console.log(privat,"privat");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setIsLoading(true)
    fetch(`${REACT_APP_BASEURL}importWallet`, requestOptions)
      .then(response => response.json())
      .then(result => {

        setIsLoading(false)
        if (result.message !== 'Wallet Already Imported') {
    
          alert('Wallet Imported SuccessFully');
        } else {
          alert('Wallet Alerady Importedd');
        }
      })
      .catch(error => {
        setIsLoading(false)
        console.log('error', error)
    });
  };

  return (
    <View style={{display: 'flex', paddingHorizontal: 16}}>
      <View>
        <View style={{margin: 20}}>
          <Icon name="sign-out-alt" size={30} color="#251B37" />
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={{color: 'black', fontSize: 25}}>Import Account</Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{color: 'black', fontSize: 16}}>
            Import Account are Viewable in your Wallet but are not recoverable
            with your MetaMask Secret recovery Phrase.
          </Text>
        </View>
        <View style={{marginBottom: 30}}>
          <Text style={{color: 'black', fontSize: 16}}>
            Learn more about imported account here.
          </Text>
        </View>
      </View>
      <View style={{display: 'flex', paddingHorizontal: 16}}>
        <View style={{marginBottom: 30}}>
          <Text style={{color: 'black', fontSize: 18}}>
            Paste your private key string
          </Text>
        </View>
        <View>
          <View style={{marginBottom: 20}}>
            <TextInput
              placeholder="e.g3ab5cra67fbgm793bkfd93nkf83475bsm"
              placeholderTextColor="#2160f3"
              autoCapitalize="none"
              style={{
                paddingLeft: 10,
                color: '#000',
                borderColor: '#6D9886',
                borderWidth: 1,
                marginTop: 2,
                marginBottom: 30,
                borderRadius: 5,
                height: 70,
              }}
              // onSubmitEditing={Keyboard.dismiss}
value={privat}
              onChangeText={text => setPrivat(text)}
            />
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <TouchableOpacity activeOpacity={0.8}
            style={{
              backgroundColor: '#0D6896',
              borderRadius: 12,
              paddingVertical: 8,
              paddingHorizontal: 8,
              width: '100%',
              borderColor: '#0D6896',
              borderWidth: 1,
              justifyContent: 'center',
            }}
            onPress={() => importPrivate()}>
            <Text
              style={{
                fontSize: 16,
                color: '#FFFFFF',
                fontWeight: 'bold',
                alignSelf: 'center',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>
              import
            </Text>
          </TouchableOpacity>
        </View>
        {isLoading && <AppLoder/>}
      </View>
    </View>
  );
};

export default AddWallet;
