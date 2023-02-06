import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../../styles';

const DashboardTabs = props => {
  const {navigation} = props;
  return (
    <>
      <View style={styles.tokenbuttons}>
        <View style={styles.buttontokens}>
          <TouchableOpacity activeOpacity={0.8} style={styles.tokenButtonContainer}>
            <Text style={styles.tokensButtonText}>Token</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttontokens}>
          <TouchableOpacity activeOpacity={0.8}
            // onPress={() => navigation.push('Collecti')}
            style={styles.collectionButtonContainer}>
            <Text style={styles.collectionsButtonText}>Collectibles</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default DashboardTabs;
