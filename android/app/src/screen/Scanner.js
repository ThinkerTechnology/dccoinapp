import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const Scanner = props => {
  const {route, navigation} = props;
  const {setAddress, address} = route.params;
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });
  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  const Send = displayValue => {
    setAddress(displayValue.split(':')[1]);
    navigation.navigate('SendToken', address);
  };
  return (
    <>
      {device != null && hasPermission && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          {barcodes.map((barcode, idx) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Send(barcode.displayValue)}>
              <Text
                key={idx}
                style={{
                  fontSize: 20,
                  color: 'red',
                  fontWeight: 'bold',
                  alignItems: 'center',
                }}>
                {barcode.displayValue}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </>
  );
};

export default Scanner;
