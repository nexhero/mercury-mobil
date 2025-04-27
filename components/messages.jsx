import React, { useEffect, useState} from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import Button from './button';
import Paragraph from './paragraph';
const FeedbackModal = ({ visible,variant="success", onClose, message }) => {
  const [vrtColor,setVrtColor] = useState(colors.primary)

  useEffect(()=>{
    switch(variant){
      case "success":
        setVrtColor(colors.text)
        break;
      case "error":
        setVrtColor(colors.danger)
        break;
      default:
        setVrtColor(colors.text)
    }
  },[variant])
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Paragraph style={[styles.message,{color:vrtColor}]}>{message}</Paragraph>
          <Button title="Close" onPress={onClose}/>
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000040',
    justifyContent: 'center',
    alignItems: 'center',

  },
  modal: {
    width: '80%',
    backgroundColor: colors.modalBackground,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  message: {
    // fontSize: 16,
    margin: 8,
    textAlign: 'center',
    // color:colors.danger
  },

});

export default FeedbackModal;
