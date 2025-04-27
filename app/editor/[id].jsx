import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { MercuryContext } from '../../lib/mercury';
import b4a from 'b4a';
import RPC from 'bare-rpc';
import RichEditor from '../../components/textEditor';
import Constants from 'expo-constants';
import colors from '../../theme/colors'; // ✅ your theme



export default function Editor() {
  const [label, setLabel] = useState('');
  const [tag, setTag] = useState('');
  const [content, setContent] = useState('');
  const [document, setDocument] = useState(null);
  const { id } = useLocalSearchParams();
  const { IPC} = useContext(MercuryContext);

  const rpc = new RPC(IPC, (req, error) => {
    const data = b4a.toString(req.data);
    if (req.command === 'document') {
      const doc = JSON.parse(data);
      setLabel(doc.label);
      setTag(doc.tag);
      setContent(doc.content);
      setDocument(doc);
    }
  });

  const onSave = () => {
    const data = { ...document, label, tag, content };
    rpc.request('save').send(JSON.stringify(data));
  };

  useEffect(() => {
    if (id === '-1' && !document) {
      rpc.request('new').send('none');
    } else {
      rpc.request('document').send(id);
    }
  }, []);

  if (!document) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

return (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.inner} style={{ flex: 1 }}>
      <TextInput
        style={styles.input}
        onChangeText={setLabel}
        value={label}
        placeholder="Label"
        placeholderTextColor={colors.muted}
      />
      <TextInput
        style={styles.input}
        onChangeText={setTag}
        value={tag}
        placeholder="Tag"
        placeholderTextColor={colors.muted}
      />
      <View style={styles.editorContainer}>
        <RichEditor onChange={setContent} content={content} />
      </View>
      <TouchableOpacity onPress={onSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Constants.statusBarHeight,
  },
  inner: {
  flexGrow: 1,
  flex: 1,
  padding: 16,
  gap: 12,
},

editorContainer: {
  flex: 1,
  backgroundColor: colors.modalBackground,
  borderColor: colors.border,
  borderWidth: 1,
  borderRadius: 6,
},


  input: {
    backgroundColor: colors.modalBackground,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    color: colors.text,
  },

  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: colors.text,
    fontWeight: '600',
  },
  text: {
    color: colors.text,
  },
});
