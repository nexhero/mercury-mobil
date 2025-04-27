// /* global Bare, BareKit */
// INFO: FOR DEBUG adb logcat "*:S bare:*"
import RPC from 'bare-rpc'
import fs from 'bare-fs'
import Corestore from 'corestore'
import Mercury from 'mercury-core'
import NoteObject from 'mercury-core/lib/objects/note.mjs'
import b4a from 'b4a'
const { IPC } = BareKit



let path = Bare.argv[1] + 'data'
if (path.includes('file://')) {
  path = path.replace('file://', '')
}

if (!fs.existsSync(path)) {
  fs.mkdirSync(path)
}

console.log(`
////////////////////
// Starup Runtime //
////////////////////
`)
const mercury = new Mercury(path)
await mercury.initialize()

Bare.on('teardown',()=>mercury.destroy())
Bare.on('exit', ()=>{
  mercury.destroy()
})
Bare.on('beforeExit', ()=>{
  console.log('Before exist')
})

try {
  mercury.listen()
  const rpc = new RPC(IPC, (req, error) => {
    const data = b4a.toString(req.data)
    switch(req.command){
      case 'new':
        createDocument()
        break;
      case 'save':
        saveDocument(JSON.parse(data))
        break;
      case 'document':
        getDocument(data)
        break;
      case 'del_doc':
        removeDocument(data)
        break;
      case 'list':
        listAllDocuments()
        break;
      case 'all_repositories':
        allRepositories()
        break;
      case 'add_repo':
        addRepository(JSON.parse(data))
        break;
      case 'remove_repo':
        removeRepository(data)
        break;
      default:
        console.log(`** Command not found: ${req.command}`)
    }
  })

  const errorCommand = (msg)=>{
    const req = rpc.request('error')
    req.send(msg)
  }
  const successCommand = (msg)=>{
    const req = rpc.request('success')
    req.send(msg)
  }
  const createDocument = ()=>{
    const _new = new NoteObject(mercury.db)
    _new.save().then(()=>{
      const req = rpc.request('document')
      req.send(JSON.stringify(_new.toJson()))
    })
    listAllDocuments()
  }
  const getDocument = (docId)=>{
    mercury.db.getDocument(docId).then((doc)=>{
      if (doc) {
        const req = rpc.request('document')
        req.send(JSON.stringify(doc.value))
      }else{
        createDocument()
      }
    })

  }
  const saveDocument = (data)=>{
    const _new = new NoteObject(mercury.db)
    _new.fromJson(data)
    _new.save()
        .then(()=>{
          // successCommand("Note has been saved")
        })
        .catch((err)=>errorCommand(String(err)))
    listAllDocuments()
  }
  const removeDocument = (id)=>{
    mercury.db.removeDocument(id)
           .catch((err)=>errorCommand(String(err)))
    listAllDocuments()
  }
  const allRepositories = ()=>{
    const result = mercury.db.getAllRepositories().then((r)=>{
      const req = rpc.request('all_repositories')
      req.send(JSON.stringify(r))
    })
  }

  const addRepository = (data)=>{
    mercury.joinRemoteRepository(data.channel,data.name)
           .then((msg)=>{
             allRepositories()
             successCommand(`${data.name} has been added as repository`)
           })
           .catch((err)=>errorCommand(String(err)))
    listAllDocuments()
  }
  const removeRepository = (id)=>{
    mercury.removeRepository(id)
           .then((msg)=>allRepositories())
           .catch((err)=>errorCommand(String(err)))
  }
  const listAllDocuments = async()=>{
    mercury.db.getAllDocuments().then((arr)=>{
      const req = rpc.request('list')
      req.send(JSON.stringify(arr))
    })

  }
  const req = rpc.request('init')
  req.send(mercury.encodeRepository())

  mercury.db.on('update',()=>{
    listAllDocuments()
  })
} catch (err) {
  console.log(`** ERROR ON RPC ${String(err)}`)
  const rpc = new RPC(IPC, (req, error) => {})
  const req = rpc.request('error')
  req.send(String(err))

}
