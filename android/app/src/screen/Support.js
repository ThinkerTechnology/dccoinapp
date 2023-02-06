import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Linking} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Support = props => {
  const {navigation} = props;
  return (
    <View
      style={{
        justifyContent: 'center',
        // alignItems: 'center',
        // flex: 1,
        marginVertical: 100,
        paddingHorizontal: 16,
      }}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../image/Support.png')}
          style={{
            height: 250,
            width: 250,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            color: '#000',
            textAlign: 'center',
            color: 'black',
            fontWeight: '400',
            fontSize: 14,
            paddingTop: 20,
            lineHeight: 20,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
          et viverra justo commodo. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
          sit amet lacus accumsan et viverra justo commodo.
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.8}
        onPress={() => Linking.openURL('mailto:support@thinkertech.org')}>
        <View
          style={{
            justifyContent: 'center',
            display: 'flex',
            marginVertical: 20,
            alignItems: 'center',
          }}>
          <Text style={{color: '#0D6896', fontSize: 18, fontWeight: 'bold'}}>
            support@do.com
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{marginTop: 20}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: '#0D6896',
            borderRadius: 28,
            paddingVertical: 10,
            paddingHorizontal: 10,
            width: '100%',
            justifyContent: 'center',
          }}
          onPress={() => {
            Linking.openURL(`tel:${`+911234567890`}`);
          }}>
          <Text
            style={{
              color: '#fff',

              fontSize: 16,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: 6,
            }}>
            <Ionicons name="call-sharp" size={22} color="#fff" /> &nbsp;
            +91-1234567890
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Support;
