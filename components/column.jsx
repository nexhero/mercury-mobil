import { StyleSheet, View } from 'react-native';

export default function Column( {children,style,props}) {
  return (
    <View {...props} style={[styles.col,style]}>
      {children}
    </View>

  );
}

export const styles = StyleSheet.create({
col: {
    flexDirection: 'column',
    gap: 12,
    alignContent:"center",
  },

})
