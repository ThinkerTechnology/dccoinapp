import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Button,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from '../styles';

const Headers = props => {
  const {navigation} = props;
  const logOut = () => {
    alert('is logOut');
  };
  return (
    <SafeAreaView>
      <View style={{paddingHorizontal: 20, backgroundColor: '#000'}}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../image/navBar.png')}
                style={{
                  height: 25,
                  width: 30,
                  marginLeft: 3,
                }}
              />
            </TouchableOpacity>

            <Image
              source={require('../image/DC_Logo.png')}
              style={{
                height: 60,
                width: 60,
                marginLeft: 20,
              }}
            />

            <View style={styles.logOutButton}>
              <Pressable>
                <Button
                  color="green"
                  onPress={() => logOut()}
                  title="Log Out"
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Headers;
