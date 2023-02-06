import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { styles } from '../styles';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const ThirdScreen = ({navigation}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        height: responsiveHeight(100), // 50% of window height
        width: responsiveWidth(100), // 50% of window width
        alignItems: 'center',
      }}>
      <View style={{}}>
        <Image
          source={require('../image/ThirdScreen.png')}
          style={{
            width: responsiveWidth(105),
            height: responsiveHeight(40),
          }}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: '#000',   fontSize: responsiveFontSize(3), fontWeight: 'bold'}}>
        Enjoy Shopping on a Decentralized Platform  
        </Text>
      </View>
      <View style={{marginTop: responsiveHeight(3)}}>
        <Text
          style={{
            color: '#000',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
          }}>
         Join the future of DE-Commerce and shop a wide range of products at discounted prices on DO Coin
        </Text>
      </View>
      <View style={styles.dotted}>
        <Text style={styles.inner}></Text>
        <Text style={styles.inner}></Text>
        <Text style={styles.firstcolor}></Text>
      </View>
      <View style={{marginTop: responsiveWidth(20)}}>
        <TouchableOpacity activeOpacity={0.8}
          style={{
            backgroundColor: '#0D6896',
            borderRadius: responsiveWidth(10),
            height: responsiveHeight(6),
            width: responsiveWidth(90),
            borderColor: '#0D6896',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Home', {screen: 'Home'})}>
          <Text
            style={{
              color: '#fff',
              fontSize: responsiveFontSize(2.2),
              fontWeight: 'bold',
              alignSelf: 'center', 
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThirdScreen;
