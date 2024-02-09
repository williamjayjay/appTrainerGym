import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { FlatList, HStack, Heading, Text, VStack } from 'native-base';
import { useState, useEffect, useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { ExerciseDTO } from '@dtos/ExerciseDTO';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { Loading } from '@components/Loading';


export function Home() {

    const [groupSelected, setGroupSelected] = useState('antebraço')
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [groups, setGroups] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenExerciseDetails(exerciseId: string) {
        navigation.navigate('exercise', { exerciseId });
    }

    async function fetchGroups() {
        try {
            const response = await api.get('/groups');
            console.log(response.data);
            setGroups(response.data);

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';

            Toast.show({
                text1: title,
                type: 'error',
            });
        }
    }

    async function fecthExercisesByGroup() {

        try {
            setIsLoading(true);
            const response = await api.get(`/exercises/bygroup/${groupSelected}`);
            setExercises(response.data);

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os exercícios';


            Toast.show({
                text1: title,
                type: 'error',
            });

        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        fetchGroups();
    }, [])

    useFocusEffect(
        useCallback(() => {
            fecthExercisesByGroup()
        }, [groupSelected])
    )

    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{
                    px: 8,
                }}
                my={10}
                maxH={10}
                minH={10}
            />


            {
                isLoading ? <Loading /> :

                    <VStack flex={1} px={8}>
                        <HStack justifyContent="space-between" mb={5}>
                            <Heading color="gray.200" fontFamily="heading" fontSize="md">
                                Exercícios
                            </Heading>

                            <Text color="gray.200" fontSize="sm">
                                {exercises.length}
                            </Text>
                        </HStack>


                        <FlatList
                            data={exercises}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <ExerciseCard
                                    data={item}
                                    onPress={() => handleOpenExerciseDetails(item.id)}

                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            _contentContainerStyle={{
                                paddingBottom: 20
                            }}

                        />
                    </VStack>
            }

        </VStack>
    )
}   