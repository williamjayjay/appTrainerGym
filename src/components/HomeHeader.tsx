import { Heading, HStack, Icon, Text, VStack } from 'native-base';
import { UserPhoto } from './UserPhoto';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import defaulUserPhotoImg from '@assets/userPhotoDefault.png';
import { api } from '@services/api';


export function HomeHeader() {
    const { user, signOut } = useAuth();

    return (
        <HStack bg="gray.600" pt={12} pb={5} px={8} alignItems="center">
            <UserPhoto
                source={
                    user.avatar
                        ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                        : defaulUserPhotoImg
                }
                size={16}
                alt="Imagem do usuário"
                mr={4}
            />
            <VStack flex={1}>
                <Text color="gray.100" fontSize="md">
                    Olá,
                </Text>

                <Heading color="gray.100" fontFamily="heading" fontSize="md">
                    {user.name}
                </Heading>
            </VStack>

            <TouchableOpacity onPress={signOut}>
                <Icon
                    as={MaterialIcons}
                    name="logout"
                    color="gray.200"
                    size={7}
                />
            </TouchableOpacity>
        </HStack>
    );
}