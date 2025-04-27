import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../theme/colors';



const RichEditor = ({ content, onChange }) => {
  const webviewRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState(content);

  const injectedJS = `
    document.body.contentEditable = true;
    document.body.style.padding = "10px";
    document.body.style.fontSize = "16px";
    document.body.innerHTML = \`${content}\`;

    const sendUpdate = () => {
      window.ReactNativeWebView.postMessage(document.body.innerHTML);
    };

    document.body.addEventListener('input', sendUpdate);
    true;
  `;

  const sendCommandToWebView = (command) => {
    webviewRef.current.injectJavaScript(`
      document.execCommand('${command}');
      true;
    `);
  };

  const sendInsertTaskList = () => {
    webviewRef.current.injectJavaScript(`
      const taskList = '<ul><li><input type="checkbox" /> Task 1</li><li><input type="checkbox" /> Task 2</li></ul>';
      document.body.innerHTML += taskList;
      true;
    `);
  };

  const setColor = (color) => {
    webviewRef.current.injectJavaScript(`
      document.execCommand('foreColor', false, '${color}');
      true;
    `);
  };

  const getHtml = () => {
    webviewRef.current.injectJavaScript(`
      window.ReactNativeWebView.postMessage(document.body.innerHTML);
      true;
    `);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body></body></html>` }}
        injectedJavaScript={injectedJS}
        onMessage={(event) => {
          const html = event.nativeEvent.data;
          setHtmlContent(html);
          if (onChange) {
            onChange(html); // ← call the parent-provided handler
          }
        }}
        style={{ flex: 1 }}
      />

      <View style={[styles.toolbar, { backgroundColor: colors.toolbarBackground }]}>
        <TouchableOpacity onPress={() => sendCommandToWebView('bold')}>
          <Icon name="bold" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendCommandToWebView('italic')}>
          <Icon name="italic" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendCommandToWebView('underline')}>
          <Icon name="underline" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendCommandToWebView('strikeThrough')}>
          <Icon name="strikethrough" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendInsertTaskList}>
          <Icon name="list-ul" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setColor('#FF5733')}>
          <Icon name="paint-brush" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendCommandToWebView('insertCode')}>
          <Icon name="code" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendCommandToWebView('removeFormat')}>
          <Icon name="eraser" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default RichEditor;
