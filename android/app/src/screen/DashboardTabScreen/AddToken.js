import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../../styles';
import {TextInput} from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

const AddToken = props => {
  const {navigation} = props;
  return (
    <View style={styles.containerAddress}>
      <View style={styles.hading}>
        <Text style={styles.TextAdd}>Import tokens </Text>
        <Text style={styles.TextHading}>custom tokens </Text>
      </View>
      <View style={styles.Dividerline}>
              <Divider />
            </View>
      <View>
        <Text style={styles.AddressText}>Token address </Text>

        <View>
          <TextInput
            placeholder="0X..."
            placeholderTextColor="#2160f3"
            autoCapitalize="none"
            style={styles.AddressInput}

            // onChangeText={text => setEmail(text)}
          />
        </View>
      </View>
      <View>
        <Text style={styles.SymbolText}>Token Symbol </Text>
        <View>
          <TextInput
            placeholder="GNO"
            placeholderTextColor="#2160f3"
            autoCapitalize="none"
            style={styles.SymbolInput}
            // onChangeText={text => setEmail(text)}
          />
        </View>
      </View>
      <View>
        <Text style={styles.DecimalText}>Token Decimal </Text>
        <View>
          <TextInput
            placeholder="18"
            placeholderTextColor="#2160f3"
            autoCapitalize="none"
            style={styles.DecimalInput}
            // onChangeText={text => setEmail(text)}
          />
        </View>
      </View>
      <View style={styles.Addbuteen}>
        <View>
          <TouchableOpacity activeOpacity={0.8}
            style={styles.CancelButtonAddresss}
            onPress={() => login()}>
            <Text style={styles.CansalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.8}
            style={styles.ImportButtonAddresss}
            onPress={() => login()}>
            <Text style={styles.ImportButtonText}>Import</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddToken;
