import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base";
import { useState } from 'react';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg'
import { useForm, Controller } from 'react-hook-form';

import { InputCustom } from "@components/InputCustom";
import { ButtonCustom } from "@components/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import Toast from 'react-native-toast-message';
import { AppError } from "@utils/AppError";


const signInSchema = yup.object({
    email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
    password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});

type FormDataProps = {
    email: string;
    password: string;
}


export function SignIn() {

    const [isLoading, setIsLoading] = useState(false)

    const { singIn } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema),
    });

    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    async function handleSignIn({ email, password }: FormDataProps) {


        try {
            setIsLoading(true);
            await singIn(email, password);

            Toast.show({
                text1: 'Usuário logado com sucesso!',
                type: 'success',
            });
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

            setIsLoading(false);
            Toast.show({
                text1: title,
                type: 'error',
            });
        }




    }

    function handleNewAccount() {
        navigation.navigate('signUp')
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
                        Acesse sua conta
                    </Heading>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange } }) => (
                            <InputCustom
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />


                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange } }) => (
                            <InputCustom
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                                onSubmitEditing={handleSubmit(handleSignIn)}
                                returnKeyType="send"
                            />

                        )}
                    />

                    <ButtonCustom

                        isLoading={isLoading} onPress={handleSubmit(handleSignIn)} title="Acessar" />
                </Center>

                <Center mt={24}>
                    <Text
                        color='gray.100'
                        fontSize='sm'
                        mb={3}
                        fontFamily='body'

                    >Ainda não tem acesso?</Text>
                    <ButtonCustom
                        isDisabled={isLoading}
                        variant='outline'
                        title="Criar conta"
                        onPress={handleNewAccount}
                    />
                </Center>
            </VStack>
        </ScrollView>

    );
}