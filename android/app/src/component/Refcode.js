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

const Refcode = props => {
  console.log(props, 'props');
  const navigation = props;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        style={styles.modalcontainer}>
        <View style={styles.centeredModelView}>
          <View style={styles.modalView}> 
            <Text style={{color: '#000', fontSize: 15, paddingBottom:10, fontWeight: 'bold', marginLeft:5}}>
              Referral Code
            </Text> 
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <View>
                <TextInput
                  placeholder=""
                  placeholderTextColor="#000"
                  style={styles.Refinput}
                  value={props.name}
                  onChangeText={text => props.setName(text)}
                  minLegth={6}
                  maxLength={6}
                />
              </View>
            </Pressable>
            <View style={styles.mainsubmitcontainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'transparent',
                  paddingVertical: 15,
                  textAlign: 'center',
                  borderColor:'#D2D2D2',
                  borderWidth:1,
                  
                  borderRadius: 28,
                  paddingHorizontal: 20,
                  width: '48%',
                }}
                onPress={() => setModalVisible(false)}>
                <Text style={{textAlign: 'center', color: '#000', fontSize:16, fontWeight:'500', }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.submitcontainer}
                onPress={() => {
                  if (props.name.length != 6) {
                    alert('Please provide a valid code');
                  } else {
                    setModalVisible(false);
                  }
                }}>
                <Text style={styles.submitheading}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable style={styles.refbutton} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Referral Code?</Text>
      </Pressable>
    </View>
  );
};

export default Refcode;
