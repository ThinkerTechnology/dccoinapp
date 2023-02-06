import {View, Text, Switch} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';

const SecuirtyDataPasscode = props => {
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(checked => !checked);
  };
  return (
    <>
      <View style={{marginTop: 30, marginBottom: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginLeft: 10, marginRight: 200, color: '#000'}}>
            Passcode Unlock
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

export default SecuirtyDataPasscode;
