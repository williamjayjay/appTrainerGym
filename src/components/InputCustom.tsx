import { IInputProps, Input } from "native-base";


export function InputCustom({ ...rest }: IInputProps) {
    return (
        <Input
            bg='gray.700'
            h={14}
            mx='4'
            borderWidth={0}
            fontSize='md'
            color='white'
            fontFamily='body'
            mb='4'
            placeholderTextColor='gray.300'
            {...rest}
        />
    )
}