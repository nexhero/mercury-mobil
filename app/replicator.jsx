import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { MercuryContext } from '../lib/mercury';
import colors from '../theme/colors';
import { useRouter } from 'expo-router'
import QRCode from 'react-native-qrcode-svg';
import {Container,Header,HeaderTitle,Row, Column, Input,IconButton, Button} from '../components'
import { useRoute } from '@react-navigation/native';

export default function Replicator() {
  const [copied, setCopied] = useState(false);

  const { fetchAllRepo, localRepo, listRepo, removeRepo } = useContext(MercuryContext);
  const router = useRouter()
  const route = useRoute()
  const localRepo_short = localRepo?localRepo.substring(0,16)+'...':'';
  useEffect(() => {
    fetchAllRepo();
  }, []);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(localRepo || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Container key={route.name}>
      <Header>
        <HeaderTitle text="Share Repository"/>
      </Header>

      <Column>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <QRCode
            value={localRepo}
            backgroundColor={colors.background}
            color={colors.text}
    /* logo={{uri:'https://pears.com/wp-content/themes/pears-theme/assets/images/mobile/pear4.png'}} */
    /* logoBackgroundColor={colors.background} */
    /* logoSize={42} */
            size={200} />
        </View>
        <Row>
          <Input editable={false} value={localRepo_short} style={{flex:1}}/>
          <Button title={copied ? 'Copied' : 'Copy'} size={16} color="info" onPress={handleCopy}/>
        </Row>
      </Column>

      <Header>
        <HeaderTitle text="Appended Repositories"/>
        <IconButton style={{ right:16,position:'absolute'}} icon="plus-circle" onPress={()=>router.push('/add_repo')}/>
      </Header>
      {listRepo.map((rep) => (
        <View key={rep.id} style={styles.rowItem}>
          <Text style={styles.repName}>{rep.name}</Text>
          <Button color="warning" size={16} weight="normal" title="Remove" onPress={() => removeRepo(rep.id)}/>
        </View>
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({

  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.modalBackground,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  repName: {
    color: colors.text,
    fontSize: 16,
  },
  removeBtn: {
    backgroundColor: colors.danger,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
});
