import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "../../styles";
import Icon from "react-native-vector-icons/Ionicons";
const TransferMode = () => {
    return (
        <View style={styles.transfercountner}>
            <View style={styles.IconTextTransfer}>
                <View style={styles.IconStyle}>
                    <Icon name="arrow-back-circle" size={20} color="#251B37" />
                </View>
                <View>
                    <Text style={styles.CreateText}>Create Wallet</Text>
                </View>
                <View>
                    <Text>-0 Points</Text>
                </View>
            </View>
            <View style={styles.DataTimeImagecontans}>
                <View style={{backgroundColor:'black',}}>
                    <Text>23 jan 2022,</Text>
                </View>
                <View style={{ marginLeft: 70 }}>
                    <Text style={styles.DataStyle}>23:30</Text>
                </View>
                <View>
                    <Image source={require("../../image/device.png")} style={styles.TransferImage} />
                </View>
            </View>
        </View>
    );
};

export default TransferMode;
