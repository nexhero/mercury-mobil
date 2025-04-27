import React, { createContext, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { Worklet } from 'react-native-bare-kit'
import bundle from '../app/app.bundle.mjs'
import RPC from 'bare-rpc'
import b4a from 'b4a'
import * as FileSystem from 'expo-file-system';


export const MercuryContext = createContext()

export const MercuryProvider = ({ children }) => {
  const [errorMsg,setErrorMsg] = useState(null)
  const [errorVisible,setErrorVisible]= useState(false)
  const [successMsg,setSuccessMsg] = useState(null)
  const [core, setCore] = useState({
    localRepo: '',
    listRepo:[],
    worklet: null,
    IPC: null,
    rpc: null,
  })

  useEffect(() => {
    const worklet = new Worklet()

    try {
      worklet.start('/app.bundle', bundle, [Platform.OS, FileSystem.documentDirectory])
    } catch (err) {
      console.error('Failed to start worklet:', err)
      return
    }

    const { IPC } = worklet

    const rpc = new RPC(IPC, (req, error) => {
      if (error) {
        console.log('**RPC ERROR**', error)
        return
      }

      const data = b4a.toString(req.data)

      if (req.command === 'init') {
        requestAnimationFrame(() => {
          try {
            console.log('local repo', data)
            setCore(prev => ({ ...prev, localRepo: data }))
          } catch (err) {
            console.log('Failed to set localRepo:', err)
          }
        })
      }
      if (req.command === 'all_repositories') {
        const list = JSON.parse(data)
        requestAnimationFrame(() => {
          try {
            setCore(prev => ({ ...prev, listRepo: list }))
          } catch (err) {
            console.log('Failed to set localRepo:', err)
          }
        })
      }

      if (req.command === 'error') {
        console.log('RPC Error Command:', data)
        setErrorMsg(data)
        // setErrorVisible(true)
      }
      if (req.command === 'success') {
        console.log('RPC Success Command:', data)
        setSuccessMsg(data)
      }
    })

    setCore(prev => ({
      ...prev,
      worklet,
      IPC,
      rpc
    }))
  }, [])

  const deleteDoc = (docId) => {
    if (core.rpc) {
      core.rpc.request('del_doc').send(docId)
    } else {
      console.warn('RPC not ready yet.')
    }
  }
  const fetchAllRepo = (docId) => {
    if (core.rpc) {
      core.rpc.request('all_repositories').send('none')
    } else {
      console.warn('RPC not ready yet.')
    }
  }
  const removeRepo = (data)=>{
    if (core.rpc) {
      core.rpc.request('remove_repo').send((data))
    } else {
      console.warn('RPC not ready yet.')
    }
  }

  const addRepo = (data)=>{
    if (core.rpc) {
      core.rpc.request('add_repo').send(JSON.stringify(data))
    } else {
      console.warn('RPC not ready yet.')
    }
  }

  const onCloseModal = ()=>{
    setErrorVisible(false)
    setErrorMsg('')
  }
  return (
    <MercuryContext.Provider
      value={{
        worklet: core.worklet,
        IPC: core.IPC,
        rpc: core.rpc,
        localRepo: core.localRepo,
        listRepo: core.listRepo,
        deleteDoc,
        fetchAllRepo,
        addRepo,
        removeRepo,
        onSuccessMsg:{msg:successMsg,reset:()=>setSuccessMsg(null)},
        onErrorMsg:{msg:errorMsg,reset:()=>setErrorMsg(null)}

      }}
    >
      {children}
      {/* <ErrorModal */}
      {/*   visible={errorVisible} */}
      {/*   message={errorMsg} */}
      {/*   onClose={()=>onCloseModal()} */}
      {/* /> */}
    </MercuryContext.Provider>
  )
}
