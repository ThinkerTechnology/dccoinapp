import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from '../styles';
import AppLoder from '../Loder/AppLoder';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const FistScreen = ({navigation}) => {
  // const [isLoading, setIsLoading] = useState(true);
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
          source={require('../image/firstSee.png')}
          style={{
            width: responsiveWidth(105),
            height: responsiveHeight(40),
          }}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: '#000',
            fontSize: responsiveFontSize(3),
            fontWeight: 'bold',
          }}>
          Experience the Benefits of Blockchain Technology
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
          Empowering shoppers, merchants, and partners with our open-source
          blockchain technology
        </Text>
      </View>
      <View style={styles.dotted}>
        <Text style={styles.firstcolor}></Text>
        <Text style={styles.inner}></Text>
        <Text style={styles.inner}></Text>
      </View>
      {/* <AppLoder/> */}
      <View style={{marginTop: responsiveWidth(20)}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: '#0D6896',
            borderRadius: responsiveWidth(10),
            height: responsiveHeight(6),
            width: responsiveWidth(90),
            borderColor: '#0D6896',
            justifyContent: 'center',
          }}
          onPress={() =>
            navigation.navigate('SecondScreen', {screen: 'SecondScreen'})
          }>
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

export default FistScreen;
