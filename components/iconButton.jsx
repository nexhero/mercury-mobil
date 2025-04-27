import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
export default function IconButton({icon,size=24,color="success",...props}){
  const [c,setC] = useState(color)
  useEffect(()=>{
    switch(color){
      case "error":
        setC(colors.danger)
        break;
      case "info":
        setC(colors.primary)
        break;
      default:
        setC(colors.text)
    }

  },[color])

  return (
    <TouchableOpacity {...props}>
      <Feather name={icon} size={size} color={c} />
    </TouchableOpacity>
  );
}
