import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import {Switch} from 'react-native-gesture-handler';
import {REACT_APP_BASEURL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecuirtyData = props => {
  const {route, navigation} = props;
  const [checked, setChecked] = useState(false);
  const [checke, setChecke] = useState(false);
  const {email} = route.params;

  const toggleSwitch = () => {
    setChecked(checked => !checked);
    if (checked == true) {
      statu = 0;
    } else if (checked == false) {
      statu = 1;
    }
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: email,
      status: statu,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${REACT_APP_BASEURL}pushNotification`, requestOptions)
      .then(response => response.json())
      .then(async result => {
        if (result.message == 'Account not Found') {
          alert('Account not Found');
        } else if (result.message == 'Notification setting updated') {
          if (statu) {
            // alert('email notification on');
          } else {
            // alert('email notification off');
          }
          await AsyncStorage.setItem('notificationStatus', statu.toString());
        } else if (result.message == 'Something went wrong') {
          alert('Something went wrong');
        }
      })
      .catch(error => console.log('error', error));
  };
  const checkPush = async () => {
    let statu = await AsyncStorage.getItem('notificationStatus');

    if (statu == '0') {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  useEffect(() => {
    check();
    checkPush();
  }, []);

  const check = async () => {
    let statu = await AsyncStorage.getItem('activityStatus');
  
    if (statu == '0') {
      setChecke(false);
    } else {
      setChecke(true);
    }
  };

  const toggleSwitchs = () => {
    setChecke(checke => !checke);
    if (checke == true) {
      statu = 0;
    } else if (checke == false) {
      statu = 1;
    }
    // return
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: email,
      status: statu,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${REACT_APP_BASEURL}emailNotification`, requestOptions)
      .then(response => response.json())
      .then(async result => {
        if (result.message == 'Account not Found') {
          alert('Account not Found');
        } else if (result.message == 'Notification setting updated') {
          if (statu) {
            // alert('email notification on');
          } else {
            // alert('email notification off');
          }
          await AsyncStorage.setItem('activityStatus', statu.toString());
        } else if (result.message == 'Something went wrong') {
          alert('Something went wrong');
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <>
      <View style={styles.containerDasboard}>
        <View>
          <Text
            style={{
              color: '#000',
              fontSize: 17,
              fontWeight: 'bold',
              paddingBottom: 20,
            }}>
            General Setting
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            borderColor: '#D2DAFF',
            borderWidth: 1,
            borderRadius: 15,
            padding: 20,
            marginVertical: 5,
          }}>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}>
                  Push Notifications
                </Text>
                <View style={{width: '90%'}}>
                  <Text
                    style={{
                      color: '#000',
                    }}>
                    Allow fetch to send push notifications to your device
                  </Text>
                </View>
              </View>
              <Switch
                trackColor={{false: '#767577', true: '#0D6896'}}
                thumbColor={checked ? '#0D6896' : '#0D6896'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={checked}
              />
            </View>
          </View>

          <View style={{marginTop: 30, marginBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}>
                  Email Notifications
                </Text>
                <View style={{width: '90%'}}>
                  <Text
                    style={{
                      color: '#000',
                    }}>
                    Allow fetch to send email notifications to your device
                  </Text>
                </View>
              </View>
              <Switch
                trackColor={{false: '#767577', true: '#0D6896'}}
                thumbColor={checke ? '#0D6896' : '#0D6896'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchs}
                value={checke}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default SecuirtyData;
