import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const Home = props => {
  const {navigation} = props;
  return (
    <View style={{
      justifyContent: 'center',
    height: responsiveHeight(100), // 50% of window height
    width: responsiveWidth(100), // 50% of window width
    alignItems: 'center',
    }}>
      <View style={{}}>
        <Image
          source={require('../image/DC-Logo.png')}
          style={{
            width: responsiveWidth(80),
            height: responsiveHeight(30),
          }}
        />
      </View>
      <View style={{marginTop: responsiveWidth(40)}}>
        {/* <Text style={styles.logoname}>DO</Text> */}
      </View>
      <View
        style={{
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
        }}>
        <TouchableOpacity activeOpacity={0.8}
          style={styles.signsButtonContainer}
          onPress={() => navigation.push('Login')}>
          <Text style={styles.signsButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}
          style={styles.RegiButtonContainer}
          onPress={() => navigation.push('Registration')}>
          <Text style={styles.RegiButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
