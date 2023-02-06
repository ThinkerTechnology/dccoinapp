import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditUp from './EditUp';
import {REACT_APP_BASEURL} from '@env';
import Clipboard, {useClipboard} from '@react-native-clipboard/clipboard';
import AppLoder from '../Loder/AppLoder';
import { Divider } from '@rneui/base';
const AccountDetailsData = props => {
  const {navigation} = props;
  // const {email} = route.params;
  const [email, setEmail] = useState();
  const [refcode, setRefcode] = useState();
  const [data, setString] = useClipboard();
  const [stakes, setStakes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    setEmail(await AsyncStorage.getItem('email'));
    setRefcode(await AsyncStorage.getItem('refferalCode'));
  };
  const fetchCopiedText = async () => {
    setString(refcode.toString());
    alert('copied');
  };
  const CopiedAddresh = async(address) => {
    setString(address.toString());
    alert('copied');
  };

  const sendOtp =async (address)=>{
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
    // return
    setIsLoading(false);
    if (result.message !== 'Enter OTP') {
      alert('Login failed');
    } else {
      navigation.push('VerifyOTP',{email,address})
      alert('Enter OTP');
    }
  };

  //all user data
  const allData = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: await AsyncStorage.getItem('email'),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setStakes([]);
    fetch(`${REACT_APP_BASEURL}fetchuser`, requestOptions)
      .then(response => response.json())
      .then(result => {
        let i = 0;
        while (i < result.result.length) {
          let obj = {
            address: result.result[i].wallet_address,
            
          };
         
          setStakes(prev => [...prev, obj]);
          i++;
        }
      })
      .catch(error => console.log('error', error));
  };



  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getData();
      allData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  // useEffect(()=>{
  //   allData();
  // },[])
  return (
    <>
      <View style={styles.containerDasboard}>
        <View>
          <Text style={styles.Accountnametext}>Account Name</Text>
        </View>
        <View style={{paddingTop:10}}>
          <Divider />
        </View>
        <View style={styles.profilescsspage}>
          <View style={styles.editbg}>
            <Icon name="user" size={20} color="#fff" />
          </View>
          <View>
            <Text style={styles.useremails}>
              {email ? email.slice(0, 28) : ''}
            </Text>
          </View> 
        <View style={{justifyContent:'flex-end', alignSelf:'flex-end', position:'absolute', right:0,top:15}}>
          <TouchableOpacity activeOpacity={0.8}>
            {/* <View style={styles.editProfile}>
              <Icon name="edit" size={20} color="#251B37" />
            </View> */}
            <Text>
              <EditUp setEmail={setEmail} email={email} />
            </Text>
          </TouchableOpacity> 
        </View>
        </View>
        {/*  referral code AREA START*/}
        <View>
          <Text style={styles.referraltext}> Referral Code </Text>
          <View>
            <View style={styles.refeeralstyle}>
              <TouchableOpacity  activeOpacity={0.8} onPress={() => fetchCopiedText()}>
                <Text style={styles.refeecode} selectable={true}>
                  {refcode}
                </Text>
              </TouchableOpacity>
              {/* <View style={styles.editProfile}>
                <Icon name="sharealt" size={18} color="#251B37" />
              </View> */}
            </View>
          </View>
        </View>
        {stakes.length > 0 &&
            stakes.map((ele,idx) => (
          <View key={idx}
          style={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'flex-start',
            alignContent: 'space-around',
          }}>
          <View>
            <Text style={{color: '#000',marginHorizontal:10,paddingVertical:10,lineHeight:40}} value={ele.address}>{ele.address ? ele.address.slice(0,7)+'...' +ele.address.slice(32,42): ''} </Text>
          </View>
         
            <View style={styles.editProfile}>
            <TouchableOpacity activeOpacity={0.8}
            onPress={() => 
              CopiedAddresh(ele.address)
              }
              >
              <Icon name="copy" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.editProfile}>
            <TouchableOpacity activeOpacity={0.8}
            onPress={() => sendOtp(ele.address)
              }
               >
              <Ionicons name="share-social-sharp" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
         
        </View>  
        ))}
           {isLoading && <AppLoder/>}
      </View>

    </>
  );
};

export default AccountDetailsData;
