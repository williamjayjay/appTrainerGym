import { useState } from 'react';
import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg'
import { InputCustom } from "@components/InputCustom";
import { ButtonCustom } from "@components/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import { api } from "@services/api";
import Toast from 'react-native-toast-message';
import { AppError } from "@utils/AppError";
import { useAuth } from '@hooks/useAuth';

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password'), null] as (string | yup.Reference<unknown>)[], 'A confirmação da senha não confere')
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation()

  const { singIn } = useAuth();

  type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
  }

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {


    try {
      setIsLoading(true)
      const response = await api.post('/users', { name, email, password });

      await singIn(email, password)
    } catch (error) {

      setIsLoading(false);

      const isAppError = error instanceof AppError;


      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde';

      Toast.show({
        text1: title,
        type: 'error',
      });
    }

  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >

      <VStack flex={1} px='10' pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={20} >
          <LogoSvg />
          <Text color='gray.100' fontSize="sm" >
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading' >
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <InputCustom
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}

              />
            )}
          />


          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputCustom
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <InputCustom
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />


          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <InputCustom
                placeholder="Confirmar a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />


          <ButtonCustom
            isLoading={isLoading}
            onPress={handleSubmit(handleSignUp)}
            title="Criar e acessar" />
        </Center>

        <ButtonCustom
          isDisabled={isLoading}
          mt={12}
          variant='outline'
          title="Voltar para o login"
          onPress={handleGoBack}
        />

      </VStack>
    </ScrollView>

  );
}