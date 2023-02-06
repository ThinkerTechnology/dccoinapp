import {View, Text, Switch} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';

const Biometics = props => {
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(checked => !checked);

  };
  return (
    <>
      <View style={{marginTop: 30, marginBottom: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginLeft: 10, marginRight: 170, color: '#000'}}>
            Login with Biometrics
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={checked ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={checked}
          />
        </View>
      </View>
    </>
  );
};

export default Biometics;
