import { StyleSheet, View } from 'react-native';
export default function Row( {children,style,props}) {
  return (
    <View style={[styles.row, style]} {...props} >
      {children}
    </View>
  );
}

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    alignContent:"center",
    alignItems:"center"
  },

})
