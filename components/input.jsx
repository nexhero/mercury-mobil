import { TextInput,StyleSheet } from 'react-native';
import colors from '../theme/colors';
export default function Input({style,...props}) {
  return (
    <TextInput
      placeholderTextColor={colors.accent}
      style={[style,styles.input]}
      {...props}
    />
  );
}

export const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.modalBackground,
    color: colors.text,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  }
})
