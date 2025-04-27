import React, { useContext, useState } from 'react';
import styles from './styles/DocumentStyle';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {useRouter} from 'expo-router'
import { MercuryContext } from '../lib/mercury';


const DocumentList = ({ data }) => {

  const [expanded, setExpanded] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const {deleteDoc} = useContext(MercuryContext)
  const router = useRouter()
  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const openMenu = (doc) => {
    setSelectedDoc(doc);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedDoc(null);
  };

  const openDoc = (id)=>{
    router.navigate('/editor/'+id)
  }
  const handleOption = (action) => {
    console.log(`${action} ->`, selectedDoc);
    if (action === 'open') {
      openDoc(selectedDoc.value)
    }
    if (action === 'delete') {
      deleteDoc(selectedDoc.value)
    }
    closeMenu();
  };

  const notes = data.filter((item) => item.type === 'note');
  const tags = data.filter((item) => item.type === 'tag');

  return (
    <View style={styles.container}>
      {/* Tag groups */}
      {tags.map((tag) => (

        <View key={tag.value} style={styles.tagContainer}>
          <Pressable onPress={() => toggleExpand(tag.value)} style={styles.tagHeader}>
            <View style={styles.tagHeaderLeft}>
              <Feather name={expanded[tag.value] ? 'chevron-down' : 'chevron-right'} size={16} color="gray" />
              <Text style={styles.tagTitle}>{tag.label}</Text>
            </View>
            <Text style={styles.itemCount}>{tag.children.length}</Text>
          </Pressable>
          {expanded[tag.value] && (
            <View style={styles.childList}>
              {tag.children.map((child) => (
                <Pressable
                  key={child.value}
                  style={styles.noteRow}
                  onPress={()=>openDoc(child.value)}
                  onLongPress={() => openMenu(child)}
                >
                  <Feather name="file-text" size={14} color="#fff" />
                  <Text style={styles.noteLabel}>{child.label}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      ))}

      {/* Ungrouped notes */}
      {notes.length > 0 && (
        <View style={styles.notesList}>
          {notes.map((note) => (
            <Pressable
              key={note.value}
              style={styles.noteRow}
              onPress={()=>openDoc(note.value)}
              onLongPress={() => openMenu(note)}
            >
              <Feather name="file-text" size={14} color="#fff" />
              <Text style={styles.noteLabel}>{note.label}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Context Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalBackdrop}>
            <View style={styles.menu}>
              <Pressable onPress={() => handleOption('open')} style={styles.menuItem}>
                <Text style={styles.menuText}>Open</Text>
              </Pressable>
              {/* <Pressable onPress={() => handleOption('rename')} style={styles.menuItem}> */}
              {/*   <Text style={styles.menuText}>Rename</Text> */}
              {/* </Pressable> */}
              <Pressable onPress={() => handleOption('delete')} style={styles.menuItem}>
                <Text style={[styles.menuText, { color: 'red' }]}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default DocumentList;
