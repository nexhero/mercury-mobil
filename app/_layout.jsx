import { Stack } from 'expo-router';
import { MercuryProvider } from '../lib/mercury';
import colors from '../theme/colors';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <MercuryProvider>

      <StatusBar style="light" />
        <SafeAreaView style={styles.appShell}>
          <Stack
            screenOptions={{
              headerStyle:{
                backgroundColor:colors.background,
              },
              headerTintColor:colors.text,

              contentStyle: { backgroundColor: 'transparent' },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="replicator" options={{ title:"Settings" }} />
            <Stack.Screen name="add_repo" options={{ title:"Add Repository" }} />
            <Stack.Screen name="editor/[id]" options={{ title: "Editor" }} />
          </Stack>
        </SafeAreaView>

    </MercuryProvider>
  );
}

const styles = StyleSheet.create({
  appShell: {

    gap:20,
    flex: 1,
    backgroundColor: colors.background,
  },
});
