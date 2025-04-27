import {  useEffect, useContext } from 'react'
import { View } from 'react-native'

import { useRouter } from 'expo-router'
import { MercuryContext } from '../lib/mercury'
export default function () {

  const {IPC} = useContext(MercuryContext)
  const router = useRouter()

  useEffect(()=>{
    if (IPC) {
      router.replace('/home','/')

    }
  },[IPC])
  return(
    <View>

    </View>

  )
}
