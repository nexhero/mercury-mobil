import { StyleSheet, View } from 'react-native';

export default function Header({children,style,...props}){
  return (
    <View style={[styles.headerContainer,style]} {...props}>
      {children}
    </View>
  );
}

export const styles = StyleSheet.create({
  headerContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    padding:24

  },

})
