import { VStack, Image, Center, Text, Heading } from "native-base";

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg'
import { InputCustom } from "@components/InputCustom";
import { ButtonCustom } from "@components/ButtonCustom";

export function SignIn() {
    return (
        <VStack flex={1} bg="gray.700" px='10'>
            <Image
                source={BackgroundImg}
                alt="Pessoas treinando"
                resizeMode="contain"
                position="absolute"
            />

            <Center my={24} >
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

            <ButtonCustom

                variant='outline'

                title="Criar conta" />


        </VStack>
    );
}