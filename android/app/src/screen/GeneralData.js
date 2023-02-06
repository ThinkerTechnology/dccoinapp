import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Icon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const GeneralData = props => {
  const {navigation} = props;
  return (
    <>
      <View style={styles.containerDasboard}>
        <TouchableOpacity activeOpacity={0.8}
        //  onPress={() => navigation.push('GeneralData')}
         >
          <View style={styles.menuprog}>
            <View style={styles.menunames}>
              <View style={styles.setticons}>
                <Icon name="dollar-sign" size={25} color="#2160f3" />
              </View>
              <View style={styles.marginleft}>
                <Text style={styles.generalstext}>Currency</Text>
                <Text style={styles.subtext}>$</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}
        //  onPress={() => navigation.push('GeneralData')}
         >
          <View style={styles.menuprog}>
            <View style={styles.menunames}>
              <View style={styles.setticons}>
                <Entypo name="notifications" size={25} color="#2160f3" />
              </View>
              <View style={styles.marginleft}>
                <Text style={styles.generalstext}>Notification Setting</Text>
                {/* <Text style={styles.subtext}>$</Text> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default GeneralData;
