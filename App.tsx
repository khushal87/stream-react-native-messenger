import React from 'react';
import {UserList} from './src/components/UserList';
import {NavigationStackParamsList} from './src/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChannelListScreen} from './src/screens/ChannelListScreen';
import {NavigationContainer} from '@react-navigation/native';
import {ChannelScreen} from './src/screens/ChannelScreen';
import {ThreadScreen} from './src/screens/ThreadScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationHeader} from './src/components/NavigationHeader';
import {MessengerWrapper} from './src/components/MessengerWrapper';
import {ChannelHeaderComponent} from './src/components/ChannelHeaderComponent';
import {AppProvider, useAppContext} from './src/context/AppContext';
import {useSyncPermissions} from './src/hooks/useSyncPermissions';

const Stack = createNativeStackNavigator<NavigationStackParamsList>();

const Messenger = () => {
  const {user} = useAppContext();

  if (!user) {
    return (
      <SafeAreaView>
        <UserList />
      </SafeAreaView>
    );
  }

  return (
    <MessengerWrapper>
      <Stack.Navigator>
        <Stack.Screen
          name="ChannelListScreen"
          component={ChannelListScreen}
          options={{header: NavigationHeader}}
        />
        <Stack.Screen
          name="ChannelScreen"
          component={ChannelScreen}
          options={{
            header: ChannelHeaderComponent,
          }}
        />
        <Stack.Screen name="ThreadScreen" component={ThreadScreen} />
      </Stack.Navigator>
    </MessengerWrapper>
  );
};

const App = () => {
  useSyncPermissions();

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <AppProvider>
          <Messenger />
        </AppProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
