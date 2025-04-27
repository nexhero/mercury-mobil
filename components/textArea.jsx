import { TextInput,StyleSheet } from 'react-native';
import colors from '../theme/colors';
import {styles as inputStyle} from './input'
export default function TextArea( props) {

  return (
    <TextInput
      placeholderTextColor={colors.accent}
      style={[inputStyle.input,styles.textArea]}
      multiline
      numberOfLines={4}
      {...props}
    />
  );
}

export const styles = StyleSheet.create({
  textArea: {
    height:'40%'
  }
})
