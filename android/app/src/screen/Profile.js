import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles';

const Profile = props => {
  const {navigation} = props;
  const [email, setEmail] = useState();

  const getData = async () => {
    setEmail(await AsyncStorage.getItem('email'));
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  const {setIsLoggedIn} = props;
  return (
    <View style={styles.containerDasboard}>
      <View style={styles.profilescsspage}>
        <View style={styles.editbg}>
          <Icon name="user" size={20} color="#fff" />
        </View>
        <View>
          <Text style={styles.useremails}>
            {email ? email.slice(0, 28) : ''}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('SecuirtyData',{email})}>
          <View style={styles.menuprog}>
            <View style={styles.menunames}>
              <View style={styles.setticons}>
                <Icon name="setting" size={25} color="#fff" />
              </View>
              <View style={styles.marginleft}>
                <Text style={styles.generalstext}>General</Text>
                <Text style={styles.subtext}>
                  Currency, Notification Setting
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity >
          <View style={styles.menuprog}>
            <View style={styles.menunames}>
              <View style={styles.setticons}>
                <Icon name="book" size={25} color="#fff" />
              </View>
              <View style={styles.marginleft}>
                <Text style={styles.generalstext}>Notifications</Text>
                <Text style={styles.subtext}>Swap & Staking Notification</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('AccountDetailsData')}>
          <View style={styles.menuprog}>
            <View style={styles.menunames}>
              <View style={styles.setticons}>
                <Icon name="user" size={25} color="#fff" />
              </View>
              <View style={styles.marginleft}>
                <Text style={styles.generalstext}>Account Details</Text>
                <Text style={styles.subtext}>
                  Profiles, Email and Blockchain ID
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.push('SecuirtyData')}>
          <View style={styles.menuprog}>
            <View style={styles.menunames}>
              <View style={styles.setticons}>
                <Icon name="lock" size={25} color="#fff" />
              </View>
              <View style={styles.marginleft}>
                <Text style={styles.generalstext}>Secuirty</Text>
                <Text style={styles.subtext}>Recovery, Authorized Devices</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity> */}
        {/* </View>

      <View style={styles.margintops}> */}
        <TouchableOpacity  activeOpacity={0.8} onPress={() => navigation.push('Support')}>
          <View style={styles.menuprog}>
            <View style={styles.menunames}>
              <View style={styles.setticons}>
                <Icon name="questioncircle" size={25} color="#fff" />
              </View>
              <View style={styles.marginleft}>
                <Text style={styles.generalstext}>Support Center</Text>
                <Text style={styles.subtext}>Custmer Support</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}
        // onPress={() => navigation.push('Support')}
        >
          <View style={styles.menuprog}>
            <View style={styles.menunames}>
              <View style={styles.setticons}>
                <Entypo name="google-play" size={25} color="#fff" />
              </View>
              <View style={styles.marginleft}>
                <Text style={styles.generalstext}>
                  Rate us on the Google Play Store
                </Text>
                <Text style={styles.subtext}>Google Store</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}
        onPress={() => navigation.push('FAQ')}
        >
          <View style={styles.menuprog}>
            <View style={styles.menunames}>
              <View style={styles.setticons}>
                <Icon
                  name="questioncircleo"
                  size={25}
                  color="#fff"
                />
              </View>
              <View style={styles.marginleft}>
                <Text style={styles.generalstext}>FAQ</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}
        // onPress={() => navigation.push('SecuirtyData')}
        >
          <View style={styles.menuprog}>
            <View style={styles.menunames}>
              <View style={styles.setticons}>
                <Ionicons
                  name="ios-information-circle-outline"
                  size={25}
                  color="#fff"
                />
              </View>
              <View style={styles.marginleft}>
                <Text style={styles.generalstext}>About Us</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.outlinesbtn}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.logoutbutten}
          onPress={async () => {
            try {
              await AsyncStorage.removeItem('email');      
              await AsyncStorage.removeItem('kyc_verify');
              await AsyncStorage.removeItem('private_key');
              await AsyncStorage.removeItem('refferalCode');
              await AsyncStorage.removeItem('wallet_address');
             
              setIsLoggedIn(false);
            } catch (error) {
              console.log(error);
            }
          }}>
          <View style={{flexDirection:'row', alignItems:'center', display:'flex', justifyContent:'center',  }}>
          <Ionicons name="log-out" size={25} color="#fff" />  
          <Text style={styles.proloutButtonText}>
          
            Logout
          </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
