import { IInputProps, Input } from "native-base";


export function InputCustom({ ...rest }: IInputProps) {
    return (
        <Input
            w='full'
            h={14}
            borderWidth={0}
            fontSize='md'
            color='white'
            fontFamily='body'
            mb='4'
            placeholderTextColor='gray.300'
            _focus={{
                bg: 'gray.700',
                borderWidth: 1,
                borderColor: 'green.500'
            }}
            {...rest}
        />
    )
}