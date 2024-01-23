import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base";

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg'
import { InputCustom } from "@components/InputCustom";
import { ButtonCustom } from "@components/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>()

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

                    <InputCustom
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder="Email" />

                    <InputCustom

                        secureTextEntry
                        placeholder="Senha" />

                    <ButtonCustom title="Acessar" />
                </Center>

                <Center mt={24}>
                    <Text
                        color='gray.100'
                        fontSize='sm'
                        mb={3}
                        fontFamily='body'

                    >Ainda não tem acesso?</Text>
                    <ButtonCustom
                        variant='outline'
                        title="Criar conta"
                        onPress={handleNewAccount}
                    />


                </Center>
            </VStack>
        </ScrollView>

    );
}