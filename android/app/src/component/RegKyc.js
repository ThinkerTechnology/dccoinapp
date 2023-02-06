import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import {id} from 'ethers/lib/utils';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {response} from 'express';
import {REACT_APP_BASEURL} from '@env';
import AppLoder from '../Loder/AppLoder';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegKyc = props => {
  const [isLoading, setIsLoading] = useState(false);
  const {route, navigation} = props;
    const {email} = route.params;
  const [imageUri, setImageUri] = useState('');
  const [choseid, setChooseId] = useState('');
  const [selfieUri, setSelfieUri] = useState('');
  const [choseselfie, setChooseSelfie] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [govtid, setGovtId] = useState('');
  const [photo, setPhote] = useState('');

  const chooseId = () => {
    // alert('uplode image ');
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('response=', response);
      if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.errorCode == 'permission') {
        console.log('permission not satisfied:', response.errorCode);
      } else if (response.errorMessage == 'others') {
        console.log('user tapped custom button:', response.errorMessage);
      } else if (response.assets[0].fileSize > 2097152) {
        alert('Maximunm image Size exceeded', 'please choose image under 2 Mb');
      } else {
        const source = {uri: response.assets[0].uri};
        console.log(source, 'sourcessssss');
        setImageUri('');
        setChooseId(source);
        setGovtId(response);
      }
    });
  };

  const IdCamara = () => {
    alert('open Camara');
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchCamera(options, response => {
      console.log('response=', response);
      if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.error) {
        console.log('imagePicker error:', response.error);
      } else if (response.customButton) {
        console.log('user tapped custom button:', response.customButton);
      } else {
        console.log(Object.keys(response), 'response keys');
        const source = {uri: response.assets[0].uri};
        console.log(source, 'source');
        setChooseId('');
        setImageUri(source);
        setGovtId(response);
      }
    });
  };

  const SelfieCamara = () => {
    alert('open Camara');
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchCamera(options, response => {
      console.log('response=', response);
      if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.error) {
        console.log('imagePicker error:', response.error);
      } else if (response.customButton) {
        console.log('user tapped custom button:', response.customButton);
      } else {
        console.log(Object.keys(response), 'response keys');
        const source = {uri: response.assets[0].uri};
        console.log(source, 'source');
        setChooseSelfie('');
        setSelfieUri(source);
        setPhote(response);
      }
    });
  };

  const chooseSelfie = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('response=', response);
      if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.errorCode == 'permission') {
        console.log('permission not satisfied:', response.errorCode);
      } else if (response.errorMessage == 'others') {
        console.log('user tapped custom button:', response.errorMessage);
      } else if (response.assets[0].fileSize > 2097152) {
        alert('Maximunm image Size exceeded', 'please choose image under 2 Mb');
      } else {
        const source = {uri: response.assets[0].uri};
        console.log(source, 'sourcessssss');
        setSelfieUri('');
        setChooseSelfie(source);
        setPhote(response);
      }
    });
  };

  const Upload = async () => {
   
    if (name == '' || name == null || name == undefined) {
      alert('Please provide a name');
      return;
    }

    if (address == '' || address == null || address == undefined) {
      alert('please provide a address');
      return;
    }
    if (photo == '' || photo == null || photo == undefined) {
      alert('Please provide a Photo');
      return;
    }
    if (govtid == '' || govtid == null || govtid == undefined) {
      alert('Please provide a pancard image');
      return;
    }

    //    console.log({
    //     name: photo.assets[0].fileName,
    //     type: photo.assets[0].type,
    //     uri:
    //       Platform.OS === 'android' ? photo.assets[0].uri : photo.assets[0].uri.replace('file://', ''),
    //   },"image")
    //    return
    var formdata = new FormData();
    formdata.append('email', email);
    formdata.append('name', name);
    formdata.append('address', address);
    formdata.append('photo', {
      name: photo.assets[0].fileName,
      type: photo.assets[0].type,
      uri:
        Platform.OS === 'android'
          ? photo.assets[0].uri
          : photo.assets[0].uri.replace('file://', ''),
    });
    formdata.append('pancard', {
      name: govtid.assets[0].fileName,
      type: govtid.assets[0].type,
      uri:
        Platform.OS === 'android'
          ? govtid.assets[0].uri
          : govtid.assets[0].uri.replace('file://', ''),
    });

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(`${REACT_APP_BASEURL}kyc`, requestOptions)
      .then(response => response.json())
      .then(async result => {
        
        console.log("result");
        setIsLoading(false);
        if (result.message == 'Something Went Wrong') {
          alert('Something Went Wrong');
        } else if (result.message == 'KYC completed successfully') {
          alert('KYC completed successfully');
          console.log(result);
          await AsyncStorage.setItem('email', email);
          
          props.setIsLoggedIn(true);
          navigation.push('TabBar');
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          height: '100%',
          paddingHorizontal: 15,
        }}>
        <View>
          <Text style={{color: '#000', fontWeight: '800', fontSize: 18}}>
            {' '}
            KYC Verification
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            marginVertical: 10,
            // backgroundColor: '#FFCC00',
            width: '100%',
            // height: 200,
            borderRadius: 5,
            borderColor: '#CEE5D0',
            borderWidth: 1,
          }}>
          <View style={{marginHorizontal: 10, marginVertical: 5}}>
            <Text style={{color: '#000', fontWeight: '800', fontSize: 15}}>Name</Text>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              // marginVertical:10
            }}>
            <TextInput
              placeholder="Enter your name "
              placeholderTextColor="#000"
              autoCapitalize="none"
              style={{
                paddingLeft: 10,
                color: '#000',
                borderColor: '#a3a3a3a8',
                borderWidth: 0.5,
                marginTop: 2,
                marginBottom: 20,
                borderRadius: 5,
                height: 45,
                width: '100%',
              }}
              //   value={value}
              //   keyboardType="numeric"
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={{marginHorizontal: 10, marginVertical: 5}}>
            <Text style={{color: '#000', fontWeight: '600', fontSize: 15}}>Address</Text>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              // marginVertical:10
            }}>
            <TextInput
              placeholder="Enter your address"
              placeholderTextColor="#000"
              autoCapitalize="none"
              style={{
                paddingLeft: 10,
                color: '#000',
                borderColor: '#a3a3a3a8',
                borderWidth: 0.5,
                marginTop: 2,
                marginBottom: 20,
                borderRadius: 5,
                height: 45,
                width: '100%',
              }}
              //   value={value}
              //   keyboardType="numeric"
              onChangeText={text => setAddress(text)}
            />
          </View>
          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <Text style={{color: '#000', fontWeight: '600', fontSize: 15}}>Govt.ID Upload</Text>
          </View>
          <View
            style={{
                marginHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#a3a3a3a8',
                borderWidth: 1,
                borderRadius: 5,
                padding: 20,
                justifyContent: 'center',
            }}>
            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity activeOpacity={0.8}
                onPress={() => {
                  chooseId();
                }}>
                <Ionicons
                  name="md-cloud-upload-outline"
                  size={25}
                  color="#0D6896"
                />
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <TouchableOpacity activeOpacity={0.8}
                onPress={() => {
                  IdCamara();
                }}>
                <Ionicons name="camera-outline" size={25} color="#0D6896" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingHorizontal: 12, paddingVertical: 10}}>
            {choseid && (
              <Image
                source={choseid && choseid}
                style={{
                    height: 400,
                    resizeMode:'cover',
                    width: '100%',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'black',
                }}
              />
            )}
            {imageUri && (
              <Image
                source={imageUri && imageUri}
                style={{
                    height: 400,
                    resizeMode:'cover',
                    width: '100%',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'black',
                }}
              />
            )}
          </View>

          <View style={{marginHorizontal: 10, marginVertical: 5}}>
            <Text style={{color: '#000', fontWeight: '600', fontSize: 15}}>Selfie Photo Upload</Text>
          </View>
          <View
            style={{
                marginHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: '#a3a3a3a8',
                borderWidth: 1,
                borderRadius: 5,
                padding: 20,
                justifyContent: 'center',
            }}>
            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity activeOpacity={0.8} onPress={chooseSelfie}>
                <Ionicons
                  name="md-cloud-upload-outline"
                  size={25}
                  color="#0D6896"
                />
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <TouchableOpacity activeOpacity={0.8}
                onPress={() => {
                  SelfieCamara();
                }}>
                <Ionicons name="camera-outline" size={25} color="#0D6896" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingHorizontal: 12, paddingVertical: 10}}>
            {selfieUri && (
              <Image
                source={selfieUri && selfieUri}
                style={{
                    height: 400,
                  resizeMode:'cover',
                  width: '100%',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'black',
                }}
              />
            )}
            {choseselfie && (
              <Image
                source={choseselfie && choseselfie}
                style={{
                    height: 400,
                    resizeMode:'cover',
                    width: '100%',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'black',
                }}
              />
            )}
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: '#0D6896',
                borderRadius: 15,
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginVertical: 15,
                marginHorizontal: 10,
                marginBottom: 20,
                alignItems: 'center',
              }}
              onPress={() => Upload()}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  fontWeight: '500',
                  alignSelf: 'center',
                  // textTransform: 'uppercase',
                  marginBottom: 6,
                }}>
                Upload
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isLoading && <AppLoder />}
    </ScrollView>
  );
};

export default RegKyc;
