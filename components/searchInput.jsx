import { StyleSheet, TextInput } from 'react-native';
import colors from '../theme/colors';
export default function SearchInput({style,...props}){
  return (
    <TextInput
      style={[styles.search,style]}
      placeholder="Search"
      placeholderTextColor={colors.muted}
      {...props}
    />
  );
}
export const styles = StyleSheet.create({
  search:{
    flex: 1,
    backgroundColor: colors.text,
    color: 'black',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18,
  }
})
