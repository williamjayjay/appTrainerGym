import { useState } from 'react';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import { InputCustom } from '@components/InputCustom';
import { ButtonCustom } from '@components/ButtonCustom';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useAuth } from '@hooks/useAuth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';


const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email?: string;
  password?: string | null | undefined;
  old_password?: string;
  confirm_password?: string | null | undefined;
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos.').nullable().transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) =>
        schema.nullable()
          .required('Informe a confirmação da senha.')
          .transform((value) => !!value ? value : null),
    }),

})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useToast();

  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/williamjayjay.png');

  const { user, updateUserProfile } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema)
  });

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



  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      await api.put('/users', data);


      const userUpdated = user;

      userUpdated.name = data.name;

      await updateUserProfile(userUpdated);

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';


      Toast.show({
        text1: title,
        type: 'error',
      });


    } finally {
      setIsUpdating(false);
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

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <InputCustom
                bg="gray.600"
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />


          <View style={{ width: '100%' }} pointerEvents="none">
            <Controller
              control={control}
              name="email"
              render={({ field: { value } }) => (
                <InputCustom
                  bg="gray.600"
                  placeholder="E-mail"
                  _disabled={{
                    bg: "gray.600",
                    opacity: 50,
                    disabled: true,
                    isDisabled: true,
                    enable: false

                  }}
                  isDisabled
                  value={value}
                />
              )}
            />

          </View>




          <Heading color="gray.200" fontFamily="heading" fontSize="md" mb={2} alignSelf="flex-start" mt={12}>
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <InputCustom
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />


          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <InputCustom
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />


          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <InputCustom
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />


          <ButtonCustom
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />

        </Center>

      </ScrollView>

    </VStack>
  )
}