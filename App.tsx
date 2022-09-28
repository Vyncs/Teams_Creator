import theme from '@theme/index';
import { ThemeProvider } from 'styled-components/native';
import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import { StatusBar } from 'react-native';

import { Loading } from '@components/Loading';

import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});


  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="Transparent"
        translucent
      />
      {fontsLoaded ? <Routes/> : <Loading/>}
    </ThemeProvider>
  );
}
