import React from 'react'
import {TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from '../../../styles';

const Searchedittoken = (props) => {
    const {navigation} = props.props;
    console.log(navigation);
  return (
    <View style={styles.searcing}>
       <View style={styles.searcingbox}>
            <View style={styles.searcinginputbox}>
                <View style={styles.searchwidth}>
                    <TextInput 
                        placeholderTextColor="#2C3639"
                        autoCapitalize="none"
                        style={styles.searchingbar}
                        placeholder='Searching..' 
                    />
                    <View style={styles.searchicons}>
                        <Icon name="search" size={16} color="#3F4E4F" />
                    </View>
                </View>
            </View> 
            <View style={styles.iconedits}> 
                <View style={styles.editbg}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Icon name="edit" size={16} color="#3F4E4F" />
                    </TouchableOpacity>
                </View> 
                {/* <View style={styles.editbg}>
                    <TouchableOpacity   onPress={() => navigation.push('Addtoken')}>
                        <Icon name="plus" size={16} color="#3F4E4F" />
                    </TouchableOpacity>
                </View> */}
            </View>
       </View>
    </View>
  )
}

export default Searchedittoken;
