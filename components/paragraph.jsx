import { StyleSheet, Text } from 'react-native';
import colors from '../theme/colors';
export default function Paragraph({children,style,...props}){
  return (
    <Text style={[styles.paragraph,style]} {...props}>
      {children}
    </Text>
  );
}

export const styles = StyleSheet.create({
  paragraph:{
    color:colors.text,
    fontSize:16,

  }

})
