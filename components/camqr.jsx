import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal, View,Text, StyleSheet } from 'react-native';
import { CameraView,useCameraPermissions } from 'expo-camera';
import {styles} from './messages'
import colors from '../theme/colors';
import Button from './button';
export default function QRScanner({callback,visible,onClose}){
  const [cameraFace,setCameraaFace] =useState('back')
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarCodeScanned = (result) => {
    if (result) {
      callback(result.data);
      console.log('scanned')
      onClose()
    }

  };

  if (!permission?.granted) {
    requestPermission()
  }

  return(
    <Modal
      presentationStyle="fullScreen"
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    style={{backgroundColor:colors.background}}
    >
      <View style={[StyleSheet.absoluteFill,{flex:1,backgroundColor:colors.background}]}>
        <View style={[styles.modal,{marginTop:'30%',backgroundColor:colors.background, width: '100%',aspectRatio: 3/4,}]}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            mode={"picture"}
            type={cameraFace}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],

            }}
            onBarcodeScanned={(r) => {
              handleBarCodeScanned(r)
	        }}
          >
          </CameraView>
        </View>
        <View style={{paddingTop:30}}>
            <Button title="Close" onPress={onClose}/>
        </View>

      </View>
    </Modal>
  )
}
