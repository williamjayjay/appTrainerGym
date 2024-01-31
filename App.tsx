import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';
import { THEME } from '@theme/index'
import { Routes } from '@routes/index';
import Toast from 'react-native-toast-message';
import { ToastSuccess } from '@components/toast/success';
import { ToastError } from '@components/toast/error';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME} >

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
      <Toast
        position="top"
        config={{
          success: (props) => <ToastSuccess {...props} />,
          error: (props) => <ToastError {...props} />,
        }}
      />
    </NativeBaseProvider>

  );
}