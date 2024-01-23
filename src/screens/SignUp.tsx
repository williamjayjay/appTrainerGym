import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base";

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg'
import { InputCustom } from "@components/InputCustom";
import { ButtonCustom } from "@components/ButtonCustom";

export function SignUp() {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >

            <VStack flex={1} px='10' pb={16}>
                <Image
                    source={BackgroundImg}
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

                    <InputCustom
                        placeholder="Nome" />

                    <InputCustom
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder="Email" />


                    <InputCustom

                        secureTextEntry
                        placeholder="Senha" />

                    <ButtonCustom title="Criar e acessar" />
                </Center>

                <ButtonCustom
                    mt={24}
                    variant='outline'
                    title="Voltar para o login" />

            </VStack>
        </ScrollView>

    );
}