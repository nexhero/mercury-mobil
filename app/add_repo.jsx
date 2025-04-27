import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
} from 'react-native';
import { MercuryContext } from '../lib/mercury';

import { QRScanner, Input, TextArea, Header, Container, HeaderTitle, Button, Column, Paragraph, FeedbackModal, IconButton } from '../components/'
import { useRouter } from 'expo-router';
export default function AddRepo() {
  const [name, setName] = useState('');
  const [channel, setChannel] = useState('');
  const { addRepo,onSuccessMsg,onErrorMsg } = useContext(MercuryContext);
  const [errorVisible,setErrorVisible] = useState(false)
  const [successVisible,setSuccessVisible] = useState(false)
  const [scanner,setScanner] = useState(false)
  const [scannerData,setScannerData] = useState(null)
  const router = useRouter()

  const scanQR = ()=>{
    setScanner(true)
  }
  const save = () => {
    addRepo({ name, channel });
    setName('');
    setChannel('');
  };
  const onCloseErrorMsg = ()=>{
    setErrorVisible(false)
    onErrorMsg.reset()
  }
  const onCloseSuccessMsg = ()=>{
    setSuccessVisible(false)
    onSuccessMsg.reset()
    router.back()
  }

  useEffect(()=>{
    if (onErrorMsg.msg) {
      setErrorVisible(true)
    }
  },[onErrorMsg.msg])

  useEffect(()=>{
    if (onSuccessMsg.msg) {
      console.log(`RESPONSE: ${onSuccessMsg.msg}`)
      setSuccessVisible(true)
    }
  },[onSuccessMsg.msg])
  return (
    <Container>
      <QRScanner callback={setChannel} visible={scanner} onClose={()=>setScanner(false)}/>
      {/* Show dialog when adding repo failed */}
      <FeedbackModal
        visible={errorVisible}
        variant="error"
        message={onErrorMsg.msg}
        onClose={()=>onCloseErrorMsg()}
      />
      {/* Show dialog when adding repo succeded */}
      <FeedbackModal
        visible={successVisible}
        variant="success"
        message={onSuccessMsg.msg}
        onClose={()=>onCloseSuccessMsg()}
      />
      <Header>
        <View style={{flex:1, alignContent:"center",alignItems:"center", justifyContent:"center"}}>
          <HeaderTitle text="Replicator" style={{paddingBottom:18}}/>
          <Column>
            <View style={{backgroundColor:"white",alignContent:"center", alignItems:"center"}}>
              <Image source={require('../assets/images/undraw_real-time-sync_ro77.png')} style={{width:150,height:150}}/>
            </View>
            <View>
              <Paragraph>
                Share documents with other devices using repositories peer-to-peer.
                Any changes made on one device are instantly reflected in others.
              </Paragraph>
            </View>
          </Column>
        </View>
      </Header>

      <Column>
        <Input
          value={name}
          placeholder="Name"
          onChangeText={setName}
        />
        <TextArea
          value={channel}
          placeholder="Remote Channel"
          onChangeText={setChannel}
        />
        <View style={{alignItems:"center"}}>
          <IconButton icon="camera" color="info" onPress={scanQR}/>
        </View>


        <Button title="Append Repository" onPress={save}/>
      </Column>
    </Container>

  );
}
