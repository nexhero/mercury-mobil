import { StyleSheet, Text } from 'react-native';
import colors from '../theme/colors';
export default function Header({text,style,...props}){
  return (
    <Text style={[styles.headerTitle,style]} {...props}>
      {text}
    </Text>
  );
}

export const styles = StyleSheet.create({
  headerTitle:{
    color:colors.text,
    fontWeight:"bold",
    fontSize:20
  }

})
