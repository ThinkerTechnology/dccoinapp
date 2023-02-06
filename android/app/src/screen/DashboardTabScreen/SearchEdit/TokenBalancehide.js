import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from '../../../styles';

const TokenBalancehide = () => {
  return (
    <>
      <View style={styles.tokenhideparice}>
            <View>
                <View style={styles.editbg}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Icon name="eye" size={16} color="#3C4048" />
                    </TouchableOpacity>
                </View> 
            </View>
            <View> 
                <Text style={styles.pricebalance}>0 BNB</Text> 
            </View>
      </View>
    </>
  )
}

export default TokenBalancehide;
