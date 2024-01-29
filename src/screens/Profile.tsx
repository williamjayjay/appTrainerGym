import { useState } from 'react';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { InputCustom } from '@components/InputCustom';
import { ButtonCustom } from '@components/ButtonCustom';
const PHOTO_SIZE = 33;

export function Profile() {

    const [photoIsLoading, setPhotoIsLoading] = useState(true);

    return (
        <VStack flex={1}>
            <ScreenHeader title='Perfil' />


            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Center mt={6} px={10}>
                    {
                        photoIsLoading ?
                            <Skeleton
                                w={PHOTO_SIZE}
                                h={PHOTO_SIZE}
                                rounded="full"
                                startColor="gray.500"
                                endColor="gray.400"
                            />
                            :
                            <UserPhoto
                                source={{ uri: 'https://github.com/rodrigorgtic.png' }}
                                alt="Foto do usuário"
                                size={PHOTO_SIZE}
                            />
                    }

                    <TouchableOpacity>
                        <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>

                    <InputCustom
                        bg="gray.600"
                        placeholder='Nome'
                    />

                    <InputCustom
                        bg="gray.600"
                        placeholder="E-mail"
                        _disabled={{
                            bg: "gray.600",
                            opacity: 50

                        }}
                        isDisabled
                    />

                    <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12}>
                        Alterar senha
                    </Heading>

                    <InputCustom
                        bg="gray.600"
                        placeholder="Senha antiga"
                        secureTextEntry
                    />

                    <InputCustom
                        bg="gray.600"
                        placeholder="Nova senha"
                        secureTextEntry
                    />

                    <InputCustom
                        bg="gray.600"
                        placeholder="Confirme a nova senha"
                        secureTextEntry
                    />

                    <ButtonCustom title="Atualizar" mt={4} />
                </Center>

            </ScrollView>
        </VStack>
    )
}