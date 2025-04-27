import { StyleSheet, View } from 'react-native';
import colors from '../theme/colors';


export default function Contianer({children,style,...props}){
  return (
    <View style={[styles.container,style]} {...props}>
      {children}
    </View>
  );
}

export const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:16,
    backgroundColor:colors.background
  }
})
