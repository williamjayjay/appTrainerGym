import { Center, Heading } from 'native-base';

type Props = {
    title: string;
}

export function ScreenHeader({ title }: Props) {
    return (
        <Center bg="gray.600" pb={6} pt={12}>
            <Heading color="gray.100" fontFamily="heading" fontSize="xl">
                {title}
            </Heading>
        </Center>
    );
}