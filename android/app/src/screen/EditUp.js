import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_BASEURL} from '@env';

const EditUp = props => {
  const {navigation, email, setEmail} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [changeEmail, setChangeEmail] = useState('');
  // update user emaile id code
  const Edit = async () => {
    if (email == '') {
      alert('please Enter a email');
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: await AsyncStorage.getItem('email'),
      newEmail: changeEmail,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${REACT_APP_BASEURL}updatemail`, requestOptions)
      .then(response => response.json())
      .then(async result => {
        setEmail(changeEmail);
        await AsyncStorage.setItem('email', changeEmail);
        setModalVisible(false);
      })

      .catch(error => console.log('error', error));
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        style={styles.modalcontainer}>
        <View style={styles.centeredModelView}>
          <View style={styles.modalView}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '500',
                paddingBottom: 10,
              }}>
              Are you sure you want to change your account email?
            </Text>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <View>
                <TextInput
                  placeholder="Enter Email Address"
                  placeholderTextColor="#000"
                  style={{  paddingLeft: 10,
                    color: '#000',
                    borderColor: '#D2D2D2',
                    borderWidth: 1,
                    marginTop: 2,
                    marginBottom: 30,
                    borderRadius: 28,
                    height: 50,
                    width: '100%',}}
                  // onChangeText={usernameHandeler}
                  onChangeText={text => setChangeEmail(text)}
                />
              </View>
            </Pressable>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity activeOpacity={0.8}
                style={{
                  backgroundColor: 'transparent',
                  paddingVertical: 15,
                  textAlign: 'center',
                  borderRadius: 28, 
                  paddingHorizontal: 20,
                  width: '48%',
                  borderColor:'#0D6896',
                  borderWidth:1,
                }}
                onPress={() => setModalVisible(false)}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 16,
                    color:'#000',
                    fontWeight: '500',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}
                style={styles.submitcontainer}
                onPress={() => Edit()}>
                <Text style={styles.submitheading}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.editProfile}>
          <Icon name="edit" size={20} color="#fff" />
        </View>
      </Pressable>
    </View>
  );
};

export default EditUp;
