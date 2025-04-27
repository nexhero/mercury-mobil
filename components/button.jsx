import { StyleSheet, TouchableOpacity,Text,View } from 'react-native';
import colors from '../theme/colors';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
export default function Button({icon,style,size=16,weight='bold',width=120,title='',color="success",...props}){
  const [c,setC] = useState(color)
  useEffect(()=>{
    switch(color){
      case "warning":
        setC(colors.danger)
        break;
      case "info":
        setC(colors.accent)
        break;
      default:
        setC(colors.primary)
    }

  },[color])

  return (
    <TouchableOpacity style={[styles.btnContainer,{backgroundColor:c},style]} {...props}>
      {icon &&
       <Feather name={icon} size={size} color={colors.text} />
      }

      <Text style={{fontSize:size,color:colors.text,fontWeight:weight}}>{title}</Text>

    </TouchableOpacity>
  );
}
export const styles = StyleSheet.create({
  btnContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary, // or whatever your primary color is
    borderRadius: 8,
    alignSelf: 'center',
    // marginVertical: 16,
    gap:8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  }
})
