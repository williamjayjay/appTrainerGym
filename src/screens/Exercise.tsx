import { useEffect, useState, } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { HStack, Heading, Icon, Text, VStack, Image, Box } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import { ButtonCustom } from '@components/ButtonCustom';

import Toast from 'react-native-toast-message';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Loading } from '@components/Loading';

type RouteParamsProps = {
    exerciseId: string;
}

export function Exercise() {

    const [isLoading, setIsLoading] = useState(true);
    const [sendingRegister, setSendingRegister] = useState(false);

    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

    const route = useRoute();

    const { exerciseId } = route.params as RouteParamsProps;


    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleGoBack() {
        navigation.goBack();
    }

    async function fetchExerciseDetails() {
        try {
            setIsLoading(true);
            const response = await api.get(`/exercises/${exerciseId}`);

            setExercise(response.data);

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício';

            Toast.show({
                text1: title,
                type: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleExerciseHistoryRegister() {
        try {
            setSendingRegister(true);

            await api.post('/history', { exercise_id: exerciseId });

            Toast.show({
                text1: 'Parabéns! Exercício registrado no seu histórico.',
                type: 'success',
            });

            navigation.navigate('history');
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível registrar exercício.';

            Toast.show({
                text1: title,
                type: 'error',
            });
        } finally {
            setSendingRegister(false);
        }
    }



    useEffect(() => {
        fetchExerciseDetails();
    }, [exerciseId])


    return (
        <VStack flex={1}>
            <VStack px={8} bg="gray.600" pt={12}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon
                        as={Feather}
                        name="arrow-left"
                        color="green.500"
                        size={6}
                    />
                </TouchableOpacity>

                <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
                    <Heading color="gray.100" fontFamily="heading" fontSize="lg" flexShrink={1}>
                        {exercise.name}
                    </Heading>

                    <HStack alignItems="center">
                        <BodySvg />

                        <Text color="gray.200" ml={1} textTransform="capitalize">
                            {exercise.group}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>



            {isLoading ? <Loading /> :
                <ScrollView showsVerticalScrollIndicator={false} >

                    <VStack p={8}>
                        <Box rounded="lg" mb={3} overflow="hidden">
                            <Image
                                w="full"
                                h={80}
                                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}` }}
                                alt="Nome do exercício"
                                resizeMode="cover"
                                rounded="lg"
                            />
                        </Box>

                        <Box bg="gray.600" rounded="md" pb={4} px={4}>
                            <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
                                <HStack>
                                    <SeriesSvg />
                                    <Text color="gray.200" ml="2">
                                        {exercise.series} séries
                                    </Text>
                                </HStack>

                                <HStack>
                                    <RepetitionsSvg />
                                    <Text color="gray.200" ml="2">
                                        {exercise.repetitions} repetições
                                    </Text>
                                </HStack>
                            </HStack>

                            <ButtonCustom
                                title="Marcar como realizado"
                                isLoading={sendingRegister}
                                onPress={handleExerciseHistoryRegister}
                            />
                        </Box>
                    </VStack>

                </ScrollView>


            }




        </VStack>
    )
}