import { useState } from 'react';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base';
import { TouchableOpacity, } from 'react-native';
import { InputCustom } from '@components/InputCustom';
import { ButtonCustom } from '@components/ButtonCustom';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import Toast from 'react-native-toast-message';


const PHOTO_SIZE = 33;

export function Profile() {
    const toast = useToast();

    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState('https://github.com/williamjayjay.png');



    async function handleUserPhotoSelected() {

        setPhotoIsLoading(true);

        try {

            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
            });

            if (photoSelected?.canceled) {

                Toast.show({
                    text1: 'Nenhuma imagem foi selecionada.',
                    type: 'error',
                });

            }

            if (photoSelected?.assets?.[0]?.uri) {
                const fileUri = photoSelected?.assets?.[0]?.uri

                const photoInfo = await FileSystem.getInfoAsync(fileUri);

                if (photoInfo?.exists && (photoInfo?.size / 1024 / 1024) > 5) {

                    return Toast.show({
                        text1: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
                        type: 'error',
                    });

                }

                setUserPhoto(fileUri);

                return Toast.show({
                    text1: 'Foto alterada com sucesso!',
                    type: 'success',
                });



            }


        } catch (error) {

            return Toast.show({
                text1: 'Erro ao importar a foto da galeria.',
                type: 'error',
            });



        }
        finally {
            setPhotoIsLoading(false)
        }

    }

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
                                source={{ uri: userPhoto }}
                                alt="Foto do usuário"
                                size={PHOTO_SIZE}
                            />
                    }

                    <TouchableOpacity onPress={handleUserPhotoSelected}>
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

                    <Heading color="gray.200" fontFamily="heading" fontSize="md" mb={2} alignSelf="flex-start" mt={12}>
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