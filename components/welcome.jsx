import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';
import colors from '../theme/colors';
import Paragraph from './paragraph';

export default function Welcome() {
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Mercury</Text>

      <Paragraph style={styles.paragraph}>
        Take control of your notes with a fully decentralized, peer-to-peer system. No servers, no middlemen—just you and your data.
      </Paragraph>

      <Paragraph style={styles.paragraph}>
        Create a new file to start fresh with secure, private notes.{' '}
        <Link href="/editor/-1">
          <Text style={styles.inlineLink}>[Create Document]</Text>
        </Link>
      </Paragraph>

      <Paragraph style={styles.paragraph}>
        Connect to a repository to sync and collaborate seamlessly.{' '}
        <Link href="/add_repo">
          <Text style={styles.inlineLink}>[Append Repository]</Text>
        </Link>
      </Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     position: 'absolute',
    top: '20%',
    left:0,
    right:0,
    paddingHorizontal: 48,
    // paddingTop: 48,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.muted,
    marginBottom: 24,
  },
  inlineLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  header: {
  fontSize: 28,
  fontWeight: '700',
  color: colors.text,
  marginBottom: 32,
  textAlign: 'center',
},

});
