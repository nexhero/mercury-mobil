import React, { useContext, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { MercuryContext } from '../lib/mercury';
import DocumentList from '../components/DocumentList';
import b4a from 'b4a';
import RPC from 'bare-rpc';
import { useRouter } from 'expo-router';
import Fuse from 'fuse.js'
import { Container, Row, SearchInput, IconButton, Header, HeaderTitle, Button, Welcome } from '../components'
export default function Home() {
  const [data, setData] = useState([]);
  const [search,setSearch] = useState('')
  const [fuse,setFuse] = useState(null)
  const [seek,setSeek] = useState([])
  const { IPC } = useContext(MercuryContext);
  const router = useRouter();

  const cleanSearch = ()=>{
    setSearch('')
  }
  useEffect(() => {
    const rpc = new RPC(IPC, (req, error) => {
      const response = b4a.toString(req.data);
      if (req.command === 'list') {
        const list = JSON.parse(response);
        setData(list);

        setFuse(new Fuse(list,{
          keys:['content','label','children.content','children.label'],
          threshold:0.3
        }))
        cleanSearch()
      }
    });
    rpc.request('list').send('none');
  }, []);

  useEffect(()=>{
    if (search.length) {
      const r = fuse.search(search)
      const extractedItems = r.map(res => res.item);
      setSeek(extractedItems)
    }
  },[search])


  const Documents = ()=>{
    return (
      <>
      {/* Header */}
      <Header>
        <HeaderTitle text="Documents"/>
        <IconButton style={{ position:'absolute',right:16}} icon="settings" onPress={() => router.push('/replicator')}/>
      </Header>

      <Row style={{height:48}}>
        <SearchInput
          value={search}
          placeholder="Search"
          onChangeText={setSearch}
        />
        <IconButton icon="x-circle" onPress={cleanSearch}/>
      </Row>

      {/* Document List */}
      <ScrollView>
        <DocumentList data={search.length?seek:data} />
      </ScrollView>

      {/* New Document button */}
      <Button title="New" icon="file-plus" onPress={() => { router.push('/editor/-1')}}/>
      </>
    )
  }
  return (
    <Container style={{paddingTop:32}}>
      { data.length ?
        <Documents/>
        :
        <Welcome/>
      }

    </Container>
  );
}

